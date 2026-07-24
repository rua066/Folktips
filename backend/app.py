import os
from flask import send_from_directory
from flask import Flask
from flask_cors import CORS
from extensions import bcrypt, jwt
from config import Config
from database.db import db
from extensions import bcrypt
from routes.health import health_bp
from routes.auth import auth_bp
from models.user import User
from models.category import Category
from routes.category import category_bp
from routes.tip import tip_bp
from routes.admin import admin_bp
from routes.favorite import favorite_bp
from routes.comment import comment_bp
from routes.rating import rating_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
CORS(app)
import os

UPLOAD_FOLDER = os.path.join(
    os.path.dirname(__file__),
    "uploads"
)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.register_blueprint(category_bp)
app.register_blueprint(tip_bp)
app.register_blueprint(admin_bp)

CORS(app)

app.register_blueprint(health_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(favorite_bp)
app.register_blueprint(comment_bp)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    print(app.url_map)
    app.run(debug=True)

@app.route("/uploads/<filename>")
def uploaded_file(filename):

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename
    )    