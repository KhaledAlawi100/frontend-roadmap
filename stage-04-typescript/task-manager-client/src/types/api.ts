import type {Task,TaskStatus} from "./task";


export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type TaskResponse = ApiResponse<Task>;

export type TasksResponse = ApiResponse<Task[]>;


export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
    title?: string;
    description?: string;
    completed?: boolean;
    status?: TaskStatus;
}

export interface ApiError{
    success: false;
    message: string;
    errors:Record<string,string>;
}



