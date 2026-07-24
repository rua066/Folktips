from models.favorite import Favorite
from database.db import db


def add_favorite(user_id, tip_id):
    favorite = Favorite.query.filter_by(
        user_id=user_id,
        tip_id=tip_id
    ).first()

    if favorite:
        return False

    favorite = Favorite(
        user_id=user_id,
        tip_id=tip_id
    )

    db.session.add(favorite)
    db.session.commit()

    return True


def remove_favorite(user_id, tip_id):
    favorite = Favorite.query.filter_by(
        user_id=user_id,
        tip_id=tip_id
    ).first()

    if not favorite:
        return False

    db.session.delete(favorite)
    db.session.commit()

    return True


def get_favorites(user_id):
    return Favorite.query.filter_by(
        user_id=user_id
    ).all()
def is_favorite(user_id, tip_id):

    favorite = Favorite.query.filter_by(
        user_id=user_id,
        tip_id=tip_id
    ).first()

    return favorite is not None