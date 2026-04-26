import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = [
    { id: 1, title: 'Learn Angular Basics', status: 'To Do' },
    { id: 2, title: 'Build Task Tracker', status: 'In Progress' },
    { id: 3, title: 'Prepare Resume Project', status: 'Done' }
  ];

  getTasks() {
    return this.tasks;
  }

  getTaskById(id: string) {
    return this.tasks.find(task => task.id === parseInt(id));
  }

  addTask(task: any) {
    this.tasks.push(task);
  }
}
