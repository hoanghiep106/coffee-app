from db import db


class CouponModel(db.Model):
	__tablename__ = 'coupons'

	id = db.Column(db.Integer, primary_key=True)
	code = db.Column(db.String(80))
	amount = db.Column(db.Integer)

	def __init__(self, code, amount):
		self.code = code
		self.amount = amount

	def json(self):
		return {'id': self.id, 'code': self.code, 'amount': self.amount}

	@classmethod
	def find_by_code(cls, code):
		return cls.query.filter_by(code=code).first()

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
