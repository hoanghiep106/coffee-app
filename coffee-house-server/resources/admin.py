from flask_restful import Resource, reqparse
from models.admin import AdminModel


class AdminRegister(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('username', type=str, required=True, help='This field cannot be left blank')
	parser.add_argument('password', type=str, required=True, help='This field cannot be left blank')

	@classmethod
	def post(cls):
		data = cls.parser.parse_args()
		if AdminModel.find_by_name(data['username']):
			return {'message': 'Username already exists'}

		user = AdminModel(**data)
		user.save_to_db()

		return {'message': 'Admin created successfully'}, 201
