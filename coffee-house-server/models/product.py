from db import db


class ProductModel(db.Model):
	__tablename__ = 'products'

	id = db.Column(db.Integet, primary_key=True)
	name = db.Column(db.String(80))
	image = db.Column(db.String(250))

	group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))

	prices = db.relationship('PriceModel', lazy='dynamic')

	def __init__(self, name, image, group_id):
		self.name = name
		self.image = image
		self.group_id = group_id

	def json(self):
		return {
			'name': self.name,
			'image': self.image,
			'group_id': self.group_id,
			'prices': [price.json() for price in self.prices.all()]
		}

	@classmethod
	def find_by_name(cls, name):
		return cls.query.filter_by(name=name).first()

	def save_to_db(self):
		db.session.add(self)
		db.session.commit()

	def delete_from_db(self):
		db.session.delete(self)
		db.session.commit()
