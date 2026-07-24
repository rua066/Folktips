from app import app
from database.db import db
from models.user import User
from extensions import bcrypt

with app.app_context():

    admin = User.query.filter_by(role="admin").first()

    if admin:

        admin.full_name = "Administrator"

        admin.email = "admin@folktips.com"

        admin.password = bcrypt.generate_password_hash(
            "Tuong@300506"
        ).decode("utf-8")

        db.session.commit()

        print("Đã cập nhật admin!")

    else:

        print("Không tìm thấy tài khoản admin.")