from database.db import db
from models.comment import Comment
from models.user import User


def add_comment(user_id, tip_id, content):

    comment = Comment(

        user_id=user_id,

        tip_id=tip_id,

        content=content,

    )

    db.session.add(comment)

    db.session.commit()

    return comment


def get_comments(tip_id):

    return (
        db.session.query(Comment, User)
        .join(User, Comment.user_id == User.id)
        .filter(Comment.tip_id == tip_id)
        .order_by(Comment.created_at.desc())
        .all()
    )  