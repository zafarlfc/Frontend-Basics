import { Routes } from '@angular/router';
import { TaskListComponent } from './features/task-list/task-list.component';
import { TaskDetailComponent } from './features/task-detail/task-detail.component';

export const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'task/:id', component: TaskDetailComponent }
];
