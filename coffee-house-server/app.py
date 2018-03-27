import os

from flask import Flask
from flask_jwt import JWT
from flask_restful import Api

from resources.admin import AdminRegister
from resources.customer import Customer, CustomerLogin
from resources.product import Product, ProductList, ProductById
from resources.price import Price, PriceById
from resources.group import Group, GroupList, GroupById

from security import authenticate, identify

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///data.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'hiep'
api = Api(app)


jwt = JWT(app, authenticate, identify)  # /auth

api.add_resource(AdminRegister, '/register')

api.add_resource(Customer, '/customer')
api.add_resource(CustomerLogin, '/login')

api.add_resource(Product, '/product')
api.add_resource(ProductById, '/product/<string:code>')
api.add_resource(ProductList, '/products')

api.add_resource(Price, '/price')
api.add_resource(PriceById, '/price/<string:id>')

api.add_resource(Group, '/group')
api.add_resource(GroupById, '/group/<string:code>')
api.add_resource(GroupList, '/groups')


if __name__ == '__main__':
	from db import db
	db.init_app(app)

	@app.before_first_request
	def create_all():
		db.create_all()
	app.run(port=5000, debug=True)
