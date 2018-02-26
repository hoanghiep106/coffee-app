from db import db


class OrderModel(db.Model):
	__tablename__ = 'orders'

	id = db.Column(db.Integer, primary_key=True)
	note = db.Column(db.String(120))
	shipping_fee = db.Column(db.Integer)

	customer_id = db.Column(db.Integer, db.ForeignKey('customers.id'))

	def __init__(self, note, shipping_fee, customer_id):
		self.note = note
		self.shipping_fee = shipping_fee
		self.customer_id = customer_id

	def json(self):
		return {
			'id': self.id,
			'note': self.note,
			'shipping_fee': self.shipping_fee,
			'customer_id': self.customer_id,
		}

	@classmethod
	def find_by_id(cls, id):
		return cls.query.filter_by(id=id).first()

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
