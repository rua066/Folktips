from flask import Blueprint, jsonify, request

from services.rating_service import (
    save_rating,
    get_rating
)

rating_bp = Blueprint(
    "rating",
    __name__,
    url_prefix="/ratings"
)


@rating_bp.route("", methods=["POST"])
def rate():

    data = request.json

    save_rating(

        data["user_id"],

        data["tip_id"],

        data["rating"]

    )

    return jsonify({

        "message": "Đã đánh giá."

    })


@rating_bp.route("/<int:tip_id>")
def get(tip_id):

    return jsonify(

        get_rating(tip_id)

    )