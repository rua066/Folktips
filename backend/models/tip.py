from database.db import db

class Tip(db.Model):
    __tablename__ = "tips"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(255), nullable=False)

    content = db.Column(db.Text, nullable=False)

    image = db.Column(db.String(255))

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id")
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )