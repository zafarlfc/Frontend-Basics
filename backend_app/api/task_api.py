from flask import Blueprint, request, jsonify

from backend_app.models import Task, db

task_api = Blueprint("tasks", __name__)


# ✅ 1. List Tasks
@task_api.route("/", methods=["GET"])
def get_tasks():
  tasks = Task.query.all()

  result = []
  for task in tasks:
    result.append({
      "id": task.id,
      "title": task.title,
      "status": task.status,
      "priority": task.priority
    })

  return jsonify(result)


# ✅ 2. Task Detail
@task_api.route("/<int:task_id>", methods=["GET"])
def get_task(task_id):
  task = Task.query.get(task_id)

  if not task:
    return jsonify({"message": "Task not found"}), 404

  return jsonify({
    "id": task.id,
    "title": task.title,
    "description": task.description,
    "status": task.status,
    "priority": task.priority,
    "created_at": task.created_at
  })


# ✅ 3. Create Task
@task_api.route("/add", methods=["POST"])
def create_task():
  data = request.get_json()

  title = data.get("title")
  description = data.get("description")
  status = data.get("status", "TODO")
  priority = data.get("priority", "MEDIUM")

  if not title:
    return jsonify({"message": "Title is required"}), 400

  task = Task(
    title=title,
    description=description,
    status=status,
    priority=priority
  )

  db.session.add(task)
  db.session.commit()

  return jsonify({"message": "Task created", "id": task.id}), 201
