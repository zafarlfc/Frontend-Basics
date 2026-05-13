from flask import Blueprint, request, jsonify

from backend_app.models import Task, db

task_api = Blueprint("tasks", __name__)


# ✅ 1. List Tasks
@task_api.route("/", methods=["GET"])
def get_tasks():
  page = int(request.args.get("page", 1))
  limit = int(request.args.get("limit", 5))

  pagination_obj = Task.query.paginate(page=page, per_page=limit, error_out=False)
  tasks = pagination_obj.items

  result = []
  for task in tasks:
    result.append({
      "id": task.id,
      "title": task.title,
      "status": task.status,
      "priority": task.priority,
      "severity": task.severity,
      "reporter": task.reporter,
      "assignee": task.assignee,
      "created_at": task.created_at
    })

  total = pagination_obj.total
  current_page = pagination_obj.page
  total_pages = pagination_obj.pages

  return jsonify({
    "data": result,
    "total": total,
    "page": current_page,
    "pages": total_pages
  }), 200


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
    "severity": task.severity,
    "reporter": task.reporter,
    "assignee": task.assignee,
    "created_at": task.created_at
  })


# ✅ 3. Create Task
@task_api.route("/add", methods=["POST"])
def create_task():
  data = request.get_json()

  title = data.get("title")
  description = data.get("description")
  status = data.get("status", "Open")
  priority = data.get("priority", "Medium")

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
