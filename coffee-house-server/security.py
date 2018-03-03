from werkzeug.security import safe_str_cmp

from models.admin import AdminModel


def authenticate(username, password):
	user = AdminModel.find_by_name(username)
	if user and safe_str_cmp(user.password, password):
		return user


def identify(payload):
	user_id = payload['identity']
	return AdminModel.find_by_id(user_id)