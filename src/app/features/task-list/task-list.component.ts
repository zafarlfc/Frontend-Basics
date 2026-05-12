import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  tasks: any[] = [];
  loading = true;
  private taskService = inject(TaskService);

  newTaskTitle: string = '';

  ngOnInit() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.loading = false;
      }
    });
  }

  addTask() {
    if (this.newTaskTitle.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle,
      status: 'To Do'
    };

    this.taskService.addTask(newTask);
    // this.tasks = this.taskService.getTasks();
    this.newTaskTitle = "";
  }

  statusColorMapping: Record<string, string> = {
    'Open': '#f59e0b',
    'To Do': '#f59e0b',
    'In Progress': '#3b82f6',
    'Done': '#10b981'
  };

}
