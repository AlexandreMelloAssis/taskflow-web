export type TaskStatus = 'Pending' | 'InProgress' | 'Done';

export interface TaskDto {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  completedAt: string | null;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskStatusRequest {
  status: TaskStatus;
}
