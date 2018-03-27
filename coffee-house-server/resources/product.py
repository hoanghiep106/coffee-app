from flask_restful import Resource, reqparse
from models.product import ProductModel
from flask_jwt import jwt_required


class Product(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('name', type=str, required=True, help='This field cannot be left blank')
	parser.add_argument('group_id', type=int, required=True, help='This field cannot be left blank')
	parser.add_argument('image', type=str)
	parser.add_argument('description', type=str)
	parser.add_argument('base_price', type=int)
	parser.add_argument('is_special', type=bool)

	@jwt_required()
	def post(self):
		data = Product.parser.parse_args()
		product = ProductModel(**data)
		product.save_to_db()
		return product.json(), 201


class ProductById(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('name', type=str)
	parser.add_argument('group_id', type=int)
	parser.add_argument('image', type=str)
	parser.add_argument('description', type=str)
	parser.add_argument('base_price', type=int)

	def get(self, code):
		product = ProductModel.find_by_id(code)
		if product:
			return product.json(), 200
		return {'message': 'Item not found'}, 404

	@jwt_required()
	def delete(self, code):
		product = ProductModel.find_by_id(code)
		if product:
			product.delete_from_db()
			return {'message': 'Product deleted'}
		return {'message': 'Item not found'}, 404

	@jwt_required()
	def put(self, code):
		product = ProductModel.find_by_id(code)
		data = Product.parser.parse_args()
		if product:
			product.name = data['name'] or product.name
			product.group_id = data['group_id'] or product.group_id
			product.image = data['image']
			product.description = data['description']
			product.base_price = data['base_price']
			product.is_special = data['is_special']
			product.save_to_db()
			return product.json(), 201
		return {'message': 'Product not found'}, 404


class ProductList(Resource):
	def get(self):
		return {'products': [product.json() for product in ProductModel.query.all()]}
