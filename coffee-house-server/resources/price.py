from flask_restful import Resource, reqparse
from models.price import PriceModel
from flask_jwt import jwt_required


class Price(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('size', type=str, required=True, help='This field cannot be left blank')
	parser.add_argument('price', type=int, required=True, help='This field cannot be left blank')
	parser.add_argument('product_id', type=int, required=True, help='This field cannot be left blank')

	@classmethod
	@jwt_required()
	def post(cls):
		data = cls.parser.parse_args()
		price = PriceModel(**data)
		try:
			price.save_to_db()
		except:
			return {'message': 'An error happened when adding the price'}
		return price.json(), 201


class PriceById(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('size', type=str, required=True, help='This field cannot be left blank')
	parser.add_argument('price', type=int, required=True, help='This field cannot be left blank')
	parser.add_argument('product_id', type=int, required=True, help='This field cannot be left blank')

	@classmethod
	@jwt_required()
	def delete(cls, id):
		price = PriceModel.find_by_id(id)
		if price:
			price.delete_from_db()
			return {'message': 'Price deleted'}
		return {'message': 'Price not found'}, 404

	@classmethod
	@jwt_required()
	def put(cls, id):
		price = PriceModel.find_by_id(id)
		data = cls.parser.parse_args()
		if price:
			price.size = data['size']
			price.price = data['price']
			price.product_id = data['product_id']
			price.save_to_db()
			return price.json(), 201
		return {'message': 'Price not found'}, 404
