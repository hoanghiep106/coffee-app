from db import db
from models.product import ProductModel


class OrderItemModel(db.Model):
	__tablename__ = 'order_items'

	id = db.Column(db.Integer, primary_key=True)
	size = db.Column(db.String(10))
	quantity = db.Column(db.Integer)

	order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
	product_id = db.Column(db.Integer, db.ForeignKey('product.id'))

	def __init__(self, size, quantity, order_id, product_id):
		self.size = size
		self.quantity = quantity
		self.order_id = order_id
		self.product_id = product_id

	def json(self):
		return {
			'id': self.id,
			'size': self.size,
			'quantity': self.quantity,
			'product': ProductModel.find_by_id(self.product_id).to_json(),
		}

	@classmethod
	def find_by_order_id(cls, order_id):
		return cls.query.filter_by(order_id=order_id)

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
