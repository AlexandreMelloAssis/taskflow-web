import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskRequest, TaskDto, UpdateTaskStatusRequest } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = 'https://localhost:5001/api/tasks';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<TaskDto[]> {
    return this.http.get<TaskDto[]>(this.apiUrl);
  }

  create(request: CreateTaskRequest): Observable<TaskDto> {
    return this.http.post<TaskDto>(this.apiUrl, request);
  }

  updateStatus(id: string, request: UpdateTaskStatusRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/status`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
