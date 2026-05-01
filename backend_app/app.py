from flask import Flask

from backend_app.api import task_api
from backend_app.config import Config
from backend_app.models import db

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)

with app.app_context():
  db.create_all()

app.register_blueprint(task_api, url_prefix="/tasks")

if __name__ == "__main__":
  app.run(debug=True)
