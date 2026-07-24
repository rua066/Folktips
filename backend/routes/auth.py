from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models.user import User
from services.auth_service import (
    email_exists,
    create_user,
    get_user_by_email
)
from extensions import bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/api/register", methods=["POST"])

def register():

    data = request.get_json()

    if email_exists(data["email"]):
        return jsonify({
            "message": "Email đã tồn tại!"
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    user = User(
        full_name=data["full_name"],
        email=data["email"],
        password=hashed_password
    )

    create_user(user)

    return jsonify({
        "message": "Đăng ký thành công!"
    }), 201

@auth_bp.route("/api/login", methods=["POST"])
def login():

    data = request.get_json()

    user = get_user_by_email(data["email"])

    if not user:
        return jsonify({
            "message": "Email không tồn tại!"
        }), 404

    if not bcrypt.check_password_hash(
        user.password,
        data["password"]
    ):
        return jsonify({
            "message": "Sai mật khẩu!"
        }), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
    "token": access_token,
    "user": {
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role
    }
}), 200
@auth_bp.route("/api/profile", methods=["GET"])
@jwt_required()
def profile():

    user_id = get_jwt_identity()

    return jsonify({
        "message": "Đăng nhập hợp lệ!",
        "user_id": user_id
    })