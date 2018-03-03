from flask_restful import Resource, reqparse
from werkzeug.security import safe_str_cmp

from models.customer import CustomerModel


class Customer(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('email', type=str, required=True, help='This field cannot be left blank')
	parser.add_argument('password', type=str)
	parser.add_argument('name', type=str)
	parser.add_argument('phone', type=str)
	parser.add_argument('address', type=str)

	@classmethod
	def post(cls):
		data = cls.parser.parse_args()
		if CustomerModel.find_by_email(data['email']):
			return {'message': 'Email already exists'}, 400

		customer = CustomerModel(**data)
		customer.save_to_db()

		return customer.json(), 201

	@classmethod
	def put(cls):
		data = cls.parser.parse_args()
		customer = CustomerModel.find_by_email(data['email'])
		if customer:
			customer.password = data['password'] or customer.password
			customer.name = data['name'] or customer.name
			customer.phone = data['phone'] or customer.phone
			customer.address = data['address'] or customer.address
			customer.save_to_db()
			return customer.json(), 200

		return {'message': 'Emails does not exists'}, 404


class CustomerLogin(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('email', type=str, required=True, help='This field cannot be left blank')
	parser.add_argument('password', type=str, required=True, help='This field cannot be left blank')

	@classmethod
	def post(cls):
		data = cls.parser.parse_args()
		customer = CustomerModel.find_by_email(data['email'])
		if customer and safe_str_cmp(customer.password, data['password']):
			return {'customer': customer.json()}, 201
		return {'message': 'Wrong email or password'}, 404
