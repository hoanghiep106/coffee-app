from db import db


class OrderItemModel(db.Model):
	__tablename__ = 'order_items'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	size = db.Column(db.String(10))
	price = db.Column(db.Integer)
	quantity = db.Column(db.Integer)

	order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))

	def __init__(self, name, size, price, quantity, order_id):
		self.name = name
		self.size = size
		self.price = price
		self.quantity = quantity
		self.order_id = order_id

	def json(self):
		return {
			'id': self.id,
			'name': self.name,
			'size': self.size,
			'price': self.price,
			'quantity': self.quantity,
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
