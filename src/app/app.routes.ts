import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { TaskDetailComponent } from './features/task-detail/task-detail.component';
import { TaskFormComponent } from './features/task-form/task-form.component';
import { TaskListComponent } from './features/task-list/task-list.component';

export const routes: Routes = [
    { path: '', component: TaskListComponent, canActivate: [authGuard] },
    { path: 'task/:id', component: TaskDetailComponent },
    { path: 'create', component: TaskFormComponent },
    { path: 'login', component: LoginComponent }
];
