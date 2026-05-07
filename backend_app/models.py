from datetime import datetime

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class Task(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(200), nullable=False)
  description = db.Column(db.Text)
  status = db.Column(db.String(50), default="Open")  # TODO, IN_PROGRESS, DONE
  priority = db.Column(db.String(50), default="Medium")
  severity = db.Column(db.String(50), default="Medium")
  reporter = db.Column(db.String(50), default="Automation")
  assignee = db.Column(db.String(50), default="Unassigned")
  created_at = db.Column(db.DateTime, default=datetime.utcnow)


class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  email = db.Column(db.String(120), unique=True, nullable=False)
  password = db.Column(db.String(255), nullable=False)

  def set_password(self, raw_password):
    self.password = generate_password_hash(raw_password)

  def check_password(self, raw_password):
    return check_password_hash(self.password, raw_password)
