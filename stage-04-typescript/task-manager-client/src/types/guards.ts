import type { Task, TaskStatus } from "./task";

import type { ApiResponse } from "./api";

function isTaskStatus(value: unknown): value is TaskStatus {
  return value === "TODO" || value === "IN_PROGRESS" || value === "COMPLETED";
}

export function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("id" in value)) {
    return false;
  }

  if (!("title" in value)) {
    return false;
  }

  if (!("completed" in value)) {
    return false;
  }

  if (!("status" in value)) {
    return false;
  }

  return (
    (typeof value.id === "number" || typeof value.id === "string") &&
    typeof value.title === "string" &&
    (!("description" in value) || typeof value.description === "string") &&
    typeof value.completed === "boolean" &&
    isTaskStatus(value.status)
  );
}

export function isTaskArray(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}

export function isApiResponse<T>(
  value: unknown,
  isDataValid: (data: unknown) => data is T,
): value is ApiResponse<T> {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("success" in value) || !("message" in value) || !("data" in value)) {
    return false;
  }

  return (
    typeof value.success === "boolean" &&
    typeof value.message === "string" &&
    isDataValid(value.data)
  );
}