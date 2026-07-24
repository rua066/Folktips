from sqlalchemy import func

from database.db import db
from models.rating import Rating


def save_rating(user_id, tip_id, score):

    rating = Rating.query.filter_by(
        user_id=user_id,
        tip_id=tip_id
    ).first()

    if rating:

        rating.rating = score

    else:

        rating = Rating(
            user_id=user_id,
            tip_id=tip_id,
            rating=score
        )

        db.session.add(rating)

    db.session.commit()


def get_rating(tip_id):

    avg, total = db.session.query(

        func.avg(Rating.rating),

        func.count(Rating.id)

    ).filter_by(

        tip_id=tip_id

    ).first()

    return {

        "average": round(avg or 0, 1),

        "count": total

    }