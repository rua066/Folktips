import os
import uuid

from flask import request
from models.tip import Tip
from database.db import db
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from flask import current_app
from flask import Blueprint, jsonify
from sqlalchemy import or_
from services.tip_service import get_all_tips, get_tip_by_id
from models.category import Category

tip_bp = Blueprint("tip", __name__)


@tip_bp.route("/api/tips", methods=["GET"])
def get_tips():

    page = request.args.get("page", 1, type=int)

    per_page = request.args.get("limit", 6, type=int)

    pagination = Tip.query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    result = []

    for tip in pagination.items:

        category = Category.query.get(tip.category_id)

        result.append({
            "id": tip.id,
            "title": tip.title,
            "description": tip.content,
            "category_id": tip.category_id,
            "category": category.name if category else "",
            "created_at": tip.created_at
        })

    return jsonify({
        "tips": result,
        "current_page": pagination.page,
        "total_pages": pagination.pages
    })
@tip_bp.route("/api/tips/<int:id>", methods=["GET"])
def get_tip(id):

    tip = get_tip_by_id(id)

    if not tip:
        return jsonify({
            "message": "Không tìm thấy mẹo."
        }), 404

    category = Category.query.get(tip.category_id)

    return jsonify({
    "id": tip.id,
    "title": tip.title,
    "description": tip.content,
    "image": tip.image,
    "category": category.name if category else "",
    "category_id": tip.category_id,
    "created_at": tip.created_at
}), 200
@tip_bp.route("/api/upload", methods=["POST"])
def upload_image():

    if "image" not in request.files:
        return {
            "message": "Không có ảnh."
        }, 400

    image = request.files["image"]

    filename = secure_filename(image.filename)

    ext = filename.rsplit(".", 1)[1]

    new_filename = f"{uuid.uuid4()}.{ext}"

    # Thêm 2 dòng này
    print(current_app.config["UPLOAD_FOLDER"])
    print(new_filename)

    image.save(
        os.path.join(
            current_app.config["UPLOAD_FOLDER"],
            new_filename
        )
    )

    return {
        "filename": new_filename
    }, 200
@tip_bp.route("/api/tips", methods=["POST"])
@jwt_required()
def create_tip():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user or user.role != "admin":
        return {
            "message": "Bạn không có quyền thêm mẹo!"
        }, 403

    data = request.get_json()

    tip = Tip(
        title=data["title"],
        content=data["content"],
        category_id=data["category_id"]
    )

    db.session.add(tip)
    db.session.commit()

    return {
        "message": "Thêm mẹo thành công!"
    }, 201
@tip_bp.route("/api/tips/<int:id>", methods=["PUT"])
@jwt_required()
def update_tip(id):

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user or user.role != "admin":
        return {
            "message": "Bạn không có quyền sửa mẹo!"
        }, 403

    tip = Tip.query.get(id)

    if not tip:
        return {
            "message": "Không tìm thấy mẹo."
        }, 404

    data = request.get_json()

    tip.title = data["title"]
    tip.content = data["content"]
    tip.category_id = data["category_id"]

    db.session.commit()

    return {
        "message": "Cập nhật thành công!"
    }, 200
@tip_bp.route("/api/tips/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_tip(id):

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user or user.role != "admin":
        return {
            "message": "Bạn không có quyền xóa mẹo!"
        }, 403

    tip = Tip.query.get(id)

    if not tip:
        return {
            "message": "Không tìm thấy mẹo."
        }, 404

    db.session.delete(tip)
    db.session.commit()

    return {
        "message": "Xóa thành công!"
    }, 200
@tip_bp.route("/api/tips/search", methods=["GET"])
def search_tips():

    keyword = request.args.get("keyword", "")
    print("Keyword:", keyword)

    tips = Tip.query.filter(
         or_(
             Tip.title.ilike(f"%{keyword}%"),
             Tip.content.ilike(f"%{keyword}%")
         )
    ).all()
    print("Found tips:", len(tips))
    result = []

    for tip in tips:

        category = Category.query.get(tip.category_id)

        result.append({
            "id": tip.id,
            "title": tip.title,
            "description": tip.content,
            "image": tip.image,
            "category": category.name if category else "",
            "created_at": tip.created_at
        })
    print(result)
    return jsonify(result), 200
@tip_bp.route("/api/tips/category/<int:category_id>", methods=["GET"])
def get_tips_by_category(category_id):

    tips = Tip.query.filter_by(category_id=category_id).all()

    result = []

    for tip in tips:

        category = Category.query.get(tip.category_id)

        result.append({
            "id": tip.id,
            "title": tip.title,
            "description": tip.content,
            "image": tip.image,
            "category": category.name if category else "",
            "created_at": tip.created_at
        })

    return jsonify(result), 200