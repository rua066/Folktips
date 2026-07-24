from sqlalchemy import func

from database.db import db

from models.user import User
from models.tip import Tip
from models.comment import Comment
from models.favorite import Favorite


def get_dashboard():

    users = db.session.query(func.count(User.id)).scalar()

    tips = db.session.query(func.count(Tip.id)).scalar()

    comments = db.session.query(func.count(Comment.id)).scalar()

    favorites = db.session.query(func.count(Favorite.id)).scalar()

    return {

        "users": users,

        "tips": tips,

        "comments": comments,

        "favorites": favorites,

    }