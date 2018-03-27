from db import db


class ProductModel(db.Model):
	__tablename__ = 'products'

	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80))
	image = db.Column(db.String(250))
	description = db.Column(db.String(250))
	base_price = db.Column(db.Integer)
	is_special = db.Column(db.Boolean, default=False)

	group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))

	prices = db.relationship('PriceModel', lazy='dynamic')

	def __init__(self, name, image, description, base_price, group_id, is_special):
		self.name = name
		self.image = image
		self.description = description
		self.base_price = base_price
		self.group_id = group_id
		self.is_special = is_special

	def json(self):
		return {
			'id': self.id,
			'name': self.name,
			'image': self.image,
			'group_id': self.group_id,
			'base_price': self.base_price,
			'description': self.description,
			'prices': [price.json() for price in self.prices.all()],
			'is_special': self.is_special
		}

	@classmethod
	def find_by_id(cls, code):
		return cls.query.filter_by(id=code).first()

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
