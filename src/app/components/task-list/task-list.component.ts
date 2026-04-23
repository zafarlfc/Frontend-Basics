import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: any[] = [];
  private taskService = inject(TaskService);

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    const newTask = {
      id: Date.now(),
      title: 'New Task',
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    this.tasks = this.taskService.getTasks();
  }

  statusColorMapping: Record<string, string> = {
    'To Do': 'red',
    'In Progress': 'orange',
    'Done': 'green'
  };

}
