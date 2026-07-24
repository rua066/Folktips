from database.db import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(255), nullable=False)

    description = db.Column(db.Text)

    icon = db.Column(db.String(100))