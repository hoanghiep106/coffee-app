from db import db


class CustomerModel(db.Model):
	__tablename__ = 'customers'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	email = db.Column(db.String(80))
	password = db.Column(db.String(20))
	phone = db.Column(db.String(13))
	address = db.Column(db.String(120))

	def __init__(self, name, email, password, phone, address):
		self.name = name
		self.email = email
		self.password = password
		self.phone = phone
		self.address = address

	def json(self):
		return {
			'id': self.id,
			'name': self.name,
			'email': self.email,
			'phone': self.phone,
			'address': self.address,
		}

	@classmethod
	def find_by_email(cls, email):
		return cls.query.filter_by(email=email).first()

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()