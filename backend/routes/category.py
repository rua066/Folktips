from flask import Blueprint, jsonify
from models.category import Category

category_bp = Blueprint("category", __name__)


@category_bp.route("/api/categories", methods=["GET"])
def get_categories():

    categories = Category.query.all()

    result = []

    for category in categories:

        result.append({
            "id": category.id,
            "name": category.name,
            "description": category.description,
            "icon": category.icon
        })

    return jsonify(result), 200