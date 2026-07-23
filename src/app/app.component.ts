import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskDto } from './models/task.model';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  tasks = signal<TaskDto[]>([]);
  newTitle = '';

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAll().subscribe((tasks) => this.tasks.set(tasks));
  }

  createTask(): void {
    const title = this.newTitle.trim();
    if (!title) {
      return;
    }

    this.taskService.create({ title }).subscribe((task) => {
      this.tasks.update((current) => [task, ...current]);
      this.newTitle = '';
    });
  }

  markDone(id: string): void {
    this.taskService.updateStatus(id, { status: 'Done' }).subscribe(() => this.loadTasks());
  }

  removeTask(id: string): void {
    this.taskService.delete(id).subscribe(() => {
      this.tasks.update((current) => current.filter((task) => task.id !== id));
    });
  }
}
