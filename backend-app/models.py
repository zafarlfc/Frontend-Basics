from datetime import datetime

from app import db


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
