import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  taskId: any = this.route.snapshot.paramMap.get('id');

  task: any = this.taskService.getTaskById(this.taskId);
}
