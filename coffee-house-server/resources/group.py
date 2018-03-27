from flask_restful import Resource, reqparse
from models.group import GroupModel
from flask_jwt import jwt_required


class Group(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('name', type=str, required=True, help='This field cannot be left blank')

	@classmethod
	@jwt_required()
	def post(cls):
		data = cls.parser.parse_args()
		group = GroupModel(**data)
		group.save_to_db()

		return group.json(), 201


class GroupById(Resource):
	parser = reqparse.RequestParser()
	parser.add_argument('name', type=str, required=True, help='This field cannot be left blank')

	@classmethod
	@jwt_required()
	def delete(cls, code):
		group = GroupModel.find_by_id(code)
		if group:
			group.delete_from_db()
			return {'message': 'Group deleted'}
		return {'message': 'Group not found'}, 404

	@classmethod
	@jwt_required()
	def put(cls, code):
		group = GroupModel.find_by_id(code)
		data = cls.parser.parse_args()
		if group:
			group.name = data['name']
			try:
				group.save_to_db()
			except:
				return {'message': 'An error happened when updating the group'}
			return group.json(), 201
		return {'message': 'Group not found'}, 404


class GroupList(Resource):
	def get(self):
		return {'groups': [group.json() for group in GroupModel.query.all()]}
