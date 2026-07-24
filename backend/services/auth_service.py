from models.user import User
from database.db import db


def email_exists(email):
    return User.query.filter_by(email=email).first()


def create_user(user):
    db.session.add(user)
    db.session.commit()


def get_user_by_email(email):
    return User.query.filter_by(email=email).first()