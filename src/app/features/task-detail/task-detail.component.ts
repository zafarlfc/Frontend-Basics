import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  taskId: any;

  constructor(private route: ActivatedRoute) {
    this.taskId = this.route.snapshot.paramMap.get('id');
  }
}
