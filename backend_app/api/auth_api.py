from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from backend_app.models import User
from backend_app.models import db

auth_api = Blueprint("auth", __name__)


# ✅ Register
@auth_api.route("/register", methods=["POST"])
def register():
  data = request.get_json()

  name = data.get("name")
  email = data.get("email")
  password = data.get("password")

  existing_user = User.query.filter_by(email=email).first()

  if existing_user:
    return jsonify({"message": "Email already exists"}), 400

  user = User(
    name=name,
    email=email
  )

  user.set_password(password)

  db.session.add(user)
  db.session.commit()

  return jsonify({"message": "User created successfully"}), 201


@auth_api.route("/login", methods=["POST"])
def login():
  data = request.get_json()

  email = data.get("email")
  password = data.get("password")

  user = User.query.filter_by(email=email).first()

  if not user or not user.check_password(password):
    return jsonify({"message": "Invalid credentials"}), 401

  token = create_access_token(identity=str(user.id))

  return jsonify({
    "token": token,
    "user": {
      "id": user.id,
      "name": user.name,
      "email": user.email
    }
  })
