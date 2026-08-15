import type { Task } from "./task";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TaskResponse = ApiResponse<Task>;

export type TasksResponse = ApiResponse<Task[]>;

export type CreateTaskRequest = Pick<Task, "title" | "description">;

export type UpdateTaskRequest = Partial<Omit<Task, "id">>;

export interface ApiError {
  success: false;
  status: number;
  message: string;
  errors: Record<string, string>;
}
