import type { ApiError } from "../types/api";

export async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  let response: Response;

  // =========================
  // Network Error
  // =========================

  try {
    response = await fetch(url, options);
  } catch {
    throw createNetworkError();
  }

  // =========================
  // HTTP Error
  // =========================

  if (!response.ok) {
    throw await createApiError(response);
  }

  // =========================
  // No Content
  // =========================

  if (response.status === 204) {
    return undefined as T;
  }

  // =========================
  // Parse JSON
  // =========================

  try {
    const data: unknown = await response.json();

    return data as T;
  } catch {
    throw createInvalidResponseError(response);
  }
}

// =========================
// API Error
// =========================

async function createApiError(response: Response): Promise<ApiError> {
  try {
    const errorData: unknown = await response.json();

    if (isApiError(errorData)) {
      return {
        ...errorData,
        status: response.status,
      };
    }
  } catch {
    // Response did not contain valid JSON.
  }

  return {
    success: false,
    status: response.status,
    message: getHttpErrorMessage(response.status),
    errors: {},
  };
}

// =========================
// Network Error
// =========================

function createNetworkError(): ApiError {
  return {
    success: false,
    status: 0,
    message: "Unable to connect to the server.",
    errors: {},
  };
}

// =========================
// Invalid Response
// =========================

function createInvalidResponseError(response: Response): ApiError {
  return {
    success: false,
    status: response.status,
    message: "The server returned an invalid response.",
    errors: {},
  };
}

// =========================
// HTTP Messages
// =========================

function getHttpErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return "Bad request.";

    case 401:
      return "You are not authorized.";

    case 404:
      return "The requested resource was not found.";

    case 500:
      return "Internal server error.";

    default:
      return `Request failed with status ${status}.`;
  }
}

// =========================
// Type Guard
// =========================

function isApiError(value: unknown): value is ApiError {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("success" in value) || !("message" in value) || !("errors" in value)) {
    return false;
  }

  return (
    value.success === false &&
    typeof value.message === "string" &&
    typeof value.errors === "object" &&
    value.errors !== null
  );
}
