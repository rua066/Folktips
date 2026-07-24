from flask import Blueprint, request, jsonify

from services.comment_service import *

comment_bp = Blueprint(

    "comment",

    __name__,

    url_prefix="/comments",

)


@comment_bp.route("", methods=["POST"])

def create():

    data = request.json

    comment = add_comment(

        data["user_id"],

        data["tip_id"],

        data["content"],

    )

    return jsonify({

        "message": "Đã bình luận."

    })


@comment_bp.route("/<int:tip_id>")

def list_comment(tip_id):

    comments = get_comments(tip_id)

    result = []

    for comment, user in comments:

        result.append({

           "id": comment.id,

           "user_id": comment.user_id,

           "user_name": user.full_name,

           "content": comment.content,

           "created_at": comment.created_at.strftime("%d/%m/%Y %H:%M"),

    })

    return jsonify(result)