import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: any[] = [];
  private taskService = inject(TaskService);

  newTaskTitle: string = '';

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  addTask() {
    if (this.newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle,
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    this.tasks = this.taskService.getTasks();
    this.newTaskTitle = "";
  }

  statusColorMapping: Record<string, string> = {
    'To Do': 'red',
    'In Progress': 'orange',
    'Done': 'green'
  };

}
