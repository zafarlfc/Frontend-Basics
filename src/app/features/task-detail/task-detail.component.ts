import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  taskId: any = this.route.snapshot.paramMap.get('id');

  task: any;

  getTask() {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task) => {
        this.task = task;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.getTask();
  }
}
