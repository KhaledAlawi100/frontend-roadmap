import { request } from "./httpClient";

import type {
  CreateTaskRequest,
  UpdateTaskRequest,
  TaskResponse,
  TasksResponse,
} from "../types/api";

import type { Task } from "../types/task";
import type { ID } from "../types/common";

const API_BASE_URL = "http://localhost:3000/tasks";

export async function getTasks(): Promise<Task[]> {
  const response: TasksResponse = await request<TasksResponse>(
    `${API_BASE_URL}`,
  );

  return response.data;
}

export async function getTaskById(id: ID): Promise<Task> {
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
  id: ID,
  requestData: UpdateTaskRequest,
): Promise<Task> {
  const response: TaskResponse = await request<TaskResponse>(
    `${API_BASE_URL}/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    },
  );
  return response.data;
}


export async function deleteTask(id: ID): Promise<void> {
  await request<void>(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
