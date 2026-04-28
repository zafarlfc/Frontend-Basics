import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../core/services/task.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private router = inject(Router);

  form = this.fb.group({
    title: ['', Validators.required],
    status: ['To Do', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;

    const newTask = {
      id: Date.now(),
      ...this.form.value
    };

    this.taskService.addTask(newTask);
    this.form.reset({ status: 'To Do' });

    this.router.navigate(['/']);
  }

}
