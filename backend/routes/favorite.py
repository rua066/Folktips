from flask import Blueprint, request, jsonify

from services.favorite_service import (
    add_favorite,
    remove_favorite,
    get_favorites,
)
from services.favorite_service import (
    add_favorite,
    remove_favorite,
    get_favorites,
    is_favorite,
)

favorite_bp = Blueprint(
    "favorite",
    __name__,
    url_prefix="/favorites",
)


# ==========================
# Thêm yêu thích
# ==========================

@favorite_bp.route("", methods=["POST"])
def save():

    try:
        data = request.get_json()

        print(data)

        user_id = data["user_id"]
        tip_id = data["tip_id"]

        ok = add_favorite(user_id, tip_id)

        if ok:
            return jsonify({"message": "Đã lưu mẹo."}), 201

        return jsonify({"message": "Đã tồn tại."}), 400

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500

# ==========================
# Xóa yêu thích
# ==========================

@favorite_bp.route("", methods=["DELETE"])
def remove():

    data = request.json

    user_id = data["user_id"]
    tip_id = data["tip_id"]

    ok = remove_favorite(user_id, tip_id)

    if ok:
        return jsonify({"message": "Đã xóa."})

    return jsonify({"message": "Không tồn tại."}), 404


# ==========================
# Danh sách yêu thích
# ==========================

@favorite_bp.route("/<int:user_id>")
def list_favorite(user_id):

    favorites = get_favorites(user_id)

    result = []

    for f in favorites:

        result.append(
            {
                "id": f.id,
                "user_id": f.user_id,
                "tip_id": f.tip_id,
                "created_at": f.created_at,
            }
        )

    return jsonify(result)
@favorite_bp.route("/check")
def check():

    user_id = int(request.args.get("user_id"))
    tip_id = int(request.args.get("tip_id"))

    ok = is_favorite(user_id, tip_id)

    return jsonify({
        "saved": ok
    })