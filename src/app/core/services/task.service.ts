import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "add", task);
  }

  // private tasks = [
  //   { id: 1, title: 'Learn Angular Basics', status: 'To Do' },
  //   { id: 2, title: 'Build Task Tracker', status: 'In Progress' },
  //   { id: 3, title: 'Prepare Resume Project', status: 'Done' }
  // ];

  // getTasks() {
  //   return this.tasks;
  // }

  // getTaskById(id: string) {
  //   return this.tasks.find(task => task.id === parseInt(id));
  // }

  // addTask(task: any) {
  //   this.tasks.push(task);
  // }
}
