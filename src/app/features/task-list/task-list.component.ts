import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

  private taskService = inject(TaskService);

  tasks: any[] = [];
  page = 1;
  limit = 2;
  total = 0;
  loading = true;

  newTaskTitle: string = '';

  ngOnInit() {
    this.taskService.getTasks(this.page, this.limit).subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.total = response.total;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        this.loading = false;
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks(this.page, this.limit).subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.total = response.total;
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
