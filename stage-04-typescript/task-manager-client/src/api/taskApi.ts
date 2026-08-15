import { request } from "./httpClient";

import { isTask, isTaskArray , isApiResponse } from "../types/guards";

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

  if (!isApiResponse(response, isTaskArray)) {
    throw new Error("Failed to parse tasks data");
  }

  return response.data;
}

export async function getTaskById(id: ID): Promise<Task> {
  const response: TaskResponse = await request<TaskResponse>(
    `${API_BASE_URL}/${id}`,
  );

  if (!isApiResponse(response, isTask)) {
    throw new Error("Failed to parse task data");
  }

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

  if (!isApiResponse(response, isTask)) {
    throw new Error("Failed to parse created task data");
  }

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
  if (!isApiResponse(response, isTask)) {
    throw new Error("Failed to parse updated task data");
  }
  return response.data;
}


export async function deleteTask(id: ID): Promise<void> {
  await request<void>(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
