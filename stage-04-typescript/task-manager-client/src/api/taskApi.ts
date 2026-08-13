import { request } from "./httpClient";

import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  TasksResponse,
} from "../types/api";

import type { Task } from "../types/task";

const API_BASE_URL = "https://api.example.com/tasks";

export async function getTasks(): Promise<Task[]> {
  const response: TasksResponse = await request<TasksResponse>(
    `${API_BASE_URL}`,
  );

  return response.data;
}

export async function getTaskById(id: number): Promise<Task> {
  const response: TaskResponse = await request<TaskResponse>(
    `${API_BASE_URL}/${id}`,
  );

  return response.data;
}

export async function createTask(
  requestData: CreateTaskRequest,
): Promise<Task> {
  const response: TaskResponse = await request<TaskResponse>(
    `${API_BASE_URL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    },
  );

  return response.data;
}

export async function updateTask(
  id: number,
  requestData: UpdateTaskRequest,
): Promise<Task> {
  const response: TaskResponse = await request<TaskResponse>(
    `${API_BASE_URL}/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    },
  );
  return response.data;
}


export async function deleteTask(id: number): Promise<void> {
  await request<void>(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
