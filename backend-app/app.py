from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from api.task_api import task_api
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy()
db.init_app(app)

app.register_blueprint(task_api, url_prefix="/tasks")

with app.app_context():
  db.create_all()

if __name__ == "__main__":
  app.run(debug=True)
