from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.dashboard_service import get_dashboard
from models.user import User
from models.tip import Tip
from models.category import Category
from flask import request

admin_bp = Blueprint("admin", __name__)


@admin_bp.route("/api/admin/dashboard", methods=["GET"])
@jwt_required()
def dashboard():

    print("===== HEADER =====")
    print(request.headers)

    user_id = get_jwt_identity()
    print("USER ID:", user_id)

    user = User.query.get(int(user_id))

    if user.role != "admin":

        return jsonify({
            "message": "Không có quyền."
        }), 403

    latest_tips = Tip.query.order_by(
        Tip.created_at.desc()
    ).limit(5).all()

    data = []

    for tip in latest_tips:

        category = Category.query.get(tip.category_id)

        data.append({

            "id": tip.id,

            "title": tip.title,

            "category": category.name if category else ""

        })

    dashboard = get_dashboard()

    dashboard["categories"] = Category.query.count()

    dashboard["latestTips"] = data

    return jsonify(dashboard)
