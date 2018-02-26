from db import db


class PriceModel(db.Model):
	__tablename__ = 'prices'

	id = db.Column(db.Integer, primary_key=True)
	size = db.Column(db.String(10))
	price = db.Column(db.Integer)

	product_id = db.Column(db.Integer, db.ForeignKey('products.id'))

	def __init__(self, size, price, product_id):
		self.size = size
		self.price = price
		self.product_id = product_id

	def json(self):
		return {'id': self.id, 'size': self.size, 'price': self.price}

	@classmethod
	def find_by_product_id(cls, product_id):
		return cls.query.filter_by(product_id=product_id)

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
