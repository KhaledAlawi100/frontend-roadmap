# Task Manager Client

A TypeScript-based frontend project built as the practical project for **Stage 4 — TypeScript** of my Frontend Roadmap.

The goal of this project is to apply TypeScript concepts through a real application instead of learning TypeScript only through isolated exercises.

---

# Stage 4 — TypeScript

## Project Goal

Build a Task Manager API Client while applying the core TypeScript concepts learned throughout Stage 4.

The project focuses on:

- Strong type safety
- Interfaces
- Type aliases
- Union types
- Type narrowing
- Generics
- Enums
- Utility types
- API contracts
- Typed API communication
- Clean project structure
- TypeScript best practices

---

# Tech Stack

- TypeScript
- Vite
- HTML
- CSS
- Fetch API
- npm

---

# Sprint 0 — Project Setup

## Goal

Create the TypeScript project correctly.

## What Was Built

- Created a Vite project using the Vanilla TypeScript template
- Initialized npm
- Installed project dependencies
- Configured TypeScript
- Enabled strict TypeScript checking
- Configured ES modules
- Created the initial project structure
- Added development server support
- Added TypeScript type checking
- Added production build support

## Project Structure

```text
task-manager-client/
│
├── src/
│   ├── api/
│   ├── types/
│   ├── services/
│   ├── utils/
│   ├── main.ts
│   └── style.css
│
├── public/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.

# Sprint 1 — Domain Model

## Goal

Define the application's data contracts.

This is the first major TypeScript sprint where we begin modeling the actual Task Manager domain before implementing the API and UI layers.

---

## What We Built

- Created the `Task` interface
- Created the `User` interface
- Created the `TaskStatus` type
- Added optional task properties
- Added readonly identifiers
- Applied union types
- Used type-only imports

---

## Concepts Applied

- Interfaces
- Type aliases
- Optional properties
- Union types
- `readonly`
- Primitive types
- Type-only imports
- Type checking

---

## Task Status

Task status is represented using a union type:

```ts
export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";



# Sprint 2 — API Contract Layer

## Goal

Model the REST API used by the Task Manager application.

The purpose of this sprint is to define clear TypeScript contracts for the data exchanged between the frontend and backend **before implementing the HTTP client**.

The main idea is:

```text
Spring Boot DTO
      ↓
    JSON
      ↓
TypeScript API Contract
      ↓
Frontend
```

---

## What We Built

* Created `ApiResponse<T>` generic response type
* Created `TaskResponse`
* Created `TasksResponse`
* Created `CreateTaskRequest`
* Created `UpdateTaskRequest`
* Created `ApiError`
* Reused the existing `Task` and `TaskStatus` domain types
* Used `Record<string, string>` for validation errors
* Applied interfaces intentionally for object contracts
* Applied type aliases for composed/specialized types
* Applied generics for reusable API response structures
* Applied optional properties for partial update requests
* Applied union/literal types for restricted values

---

## API Types Structure

```text
src/
└── types/
    ├── api.ts
    ├── task.ts
    └── user.ts
```

The `api.ts` file contains **API contracts only**.

It does not make HTTP requests.

The actual API implementation will be added later under:

```text
src/api/
```

---

# 1. Generic API Response

The main reusable response contract is:

```ts
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
```

The generic `T` represents the type of the `data` property.

For example:

```ts
ApiResponse<Task>
```

means:

```text
data → Task
```

while:

```ts
ApiResponse<Task[]>
```

means:

```text
data → Task[]
```

This allows us to define the common response structure **once** instead of duplicating it for every resource.

---

# 2. Task Response

A response containing one task is:

```ts
export type TaskResponse = ApiResponse<Task>;
```

Conceptually:

```text
TaskResponse
├── success → boolean
├── message → string
└── data    → Task
```

Example:

```ts
const response: TaskResponse = {
  success: true,
  message: "Task retrieved",
  data: {
    id: 1,
    title: "Learn TypeScript",
    completed: false,
    status: "IN_PROGRESS",
  },
};
```

---

# 3. Tasks Response

A response containing multiple tasks is:

```ts
export type TasksResponse = ApiResponse<Task[]>;
```

Here:

```text
data → Task[]
```

Example:

```ts
const response: TasksResponse = {
  success: true,
  message: "Tasks retrieved",
  data: [
    {
      id: 1,
      title: "Learn TypeScript",
      completed: false,
      status: "IN_PROGRESS",
    },
    {
      id: 2,
      title: "Build API Client",
      completed: false,
      status: "TODO",
    },
  ],
};
```

---

# 4. Create Task Request

The frontend does not need to send the complete `Task` object when creating a task.

We define:

```ts
export interface CreateTaskRequest {
  title: string;
  description?: string;
}
```

Example:

```ts
const request: CreateTaskRequest = {
  title: "Learn TypeScript API Contracts",
  description: "Practice REST API typing",
};
```

The backend can generate or determine values such as:

```text
id
completed
status
```

This is why `CreateTaskRequest` is separate from `Task`.

---

# 5. Update Task Request

An update may modify only some fields:

```ts
export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatus;
}
```

Example:

```ts
const request: UpdateTaskRequest = {
  completed: true,
};
```

Another example:

```ts
const request: UpdateTaskRequest = {
  title: "Learn Advanced TypeScript",
  status: "IN_PROGRESS",
};
```

All properties are optional because an update does not necessarily modify every field.

---

# 6. API Error

Validation and other API errors are represented by:

```ts
export interface ApiError {
  success: false;
  message: string;
  errors: Record<string, string>;
}
```

Example:

```ts
const error: ApiError = {
  success: false,
  message: "Validation failed",
  errors: {
    title: "Title is required",
    email: "Invalid email address",
  },
};
```

Notice:

```ts
success: false;
```

rather than:

```ts
success: boolean;
```

because this specific contract represents a failed response.

---

# 7. Why `Record<string, string>`?

We already learned `Record` in the Utility Types lesson.

```ts
Record<string, string>
```

means approximately:

```text
keys   → string
values → string
```

So this is valid:

```ts
const errors: Record<string, string> = {
  title: "Title is required",
  email: "Invalid email address",
  message: "Message is too long",
};
```

This is conceptually similar to the Spring Boot type:

```java
Map<String, String>
```

So:

```text
Java                         TypeScript

Map<String, String>    →     Record<string, string>
```

---

# 8. Interface vs Type Alias

We intentionally use both.

### Interfaces

Used for object contracts:

```ts
interface CreateTaskRequest {
  title: string;
  description?: string;
}
```

```ts
interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatus;
}
```

```ts
interface ApiError {
  success: false;
  message: string;
  errors: Record<string, string>;
}
```

### Type Aliases

Used for specialized/composed types:

```ts
type TaskResponse = ApiResponse<Task>;

type TasksResponse = ApiResponse<Task[]>;
```

This follows the rule from Sprint 1:

> **Choose the type representation intentionally.**

---

# 9. Backend Connection

Our API contract layer represents the JSON exchanged with the Spring Boot backend.

The flow is:

```text
Spring Boot DTO
       ↓
      JSON
       ↓
TypeScript Interface / Type
       ↓
Frontend API Client
```

For example:

```text
Spring Boot
CreateTaskRequest
       ↓
      JSON
       ↓
TypeScript
CreateTaskRequest
```

And:

```text
Spring Boot
Map<String, String>
       ↓
      JSON
       ↓
TypeScript
Record<string, string>
```

The goal is **not** to copy Java classes directly.

The goal is to accurately represent the API contract on the frontend.

---

# 10. API Contracts vs API Implementation

These are deliberately separated.

```text
src/types/api.ts
        ↓
What the API data looks like
```

while:

```text
src/api/
        ↓
How we communicate with the API
```

So:

```text
types/api.ts
    = contracts

api/taskApi.ts
    = implementation
```

We will build the actual HTTP implementation in **Sprint 3**.

---

# 11. Example Contract Flow

### Single Task

```text
Backend
   ↓
JSON
   ↓
ApiResponse<Task>
   ↓
TaskResponse
   ↓
Typed API Client
   ↓
Frontend
```

### Multiple Tasks

```text
Backend
   ↓
JSON
   ↓
ApiResponse<Task[]>
   ↓
TasksResponse
   ↓
Typed API Client
   ↓
Frontend
```

---

# 12. Concepts Applied

This sprint applies:

* **Generics**
* **Interfaces**
* **Type aliases**
* **Optional properties**
* **Union/literal types**
* **`Record`**
* **API contracts**
* **Backend/frontend DTO mapping**

---

# 13. Verification

Run:

```bash
npm run type-check
```

Then:

```bash
npm run build
```

And verify the application still runs:

```bash
npm run dev
```

You should also deliberately test invalid values.

### Invalid create request

```ts
const request: CreateTaskRequest = {
  title: 123,
};
```

### Invalid update request

```ts
const request: UpdateTaskRequest = {
  status: "DONE",
};
```

### Invalid API error

```ts
const error: ApiError = {
  success: true,
  message: "Validation failed",
  errors: {},
};
```

TypeScript should reject all three.

---

# Deliverable

A complete API contract layer:

```text
src/
└── types/
    ├── api.ts
    ├── task.ts
    └── user.ts
```

The layer now defines:

* `ApiResponse<T>`
* `TaskResponse`
* `TasksResponse`
* `CreateTaskRequest`
* `UpdateTaskRequest`
* `ApiError`

---

# Sprint Result

The Task Manager frontend now has a clear, strongly typed contract for communicating with the future REST API.

We have separated:

```text
Domain Model
     ↓
API Contract
     ↓
API Implementation
```

This gives Sprint 3 a clean foundation.

---

# Git Commit

```text
feat: define typed API contracts
```



# Sprint 3 — HTTP Client

## Goal

Build the low-level HTTP communication layer.

The purpose of this sprint is to create a reusable HTTP client instead of repeating `fetch()` logic throughout the application.

The architecture becomes:

```text
UI
 ↓
Service
 ↓
API Client
 ↓
fetch()
 ↓
REST API
```

---

## What We Built

* Created a reusable `httpClient.ts`
* Created a generic `request<T>()` function
* Added support for `RequestInit`
* Used `async/await`
* Used `Promise<T>`
* Added HTTP error handling
* Added `unknown` for untrusted API error data
* Added an `ApiError` type guard
* Reused the `ApiError` contract from Sprint 2
* Applied generic type inference
* Kept the HTTP client independent from specific resources such as tasks or users

---

## HTTP Client Structure

```text
src/
├── api/
│   └── httpClient.ts
│
└── types/
    ├── api.ts
    ├── task.ts
    └── user.ts
```

The `httpClient.ts` file contains generic HTTP communication logic.

It does not contain task-specific operations such as:

```text
getTasks()
createTask()
updateTask()
deleteTask()
```

Those will belong to the API/service layers introduced in later sprints.

---

# Generic Request Function

The core function is:

```ts
export async function request<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw await createApiError(response);
  }

  return (await response.json()) as T;
}
```

The generic type parameter `T` represents the expected response type.

For example:

```ts
request<Task>()
```

means:

```text
T = Task
```

so the function returns:

```text
Promise<Task>
```

While:

```ts
request<Task[]>()
```

means:

```text
T = Task[]
```

so the function returns:

```text
Promise<Task[]>
```

This allows one HTTP implementation to support many resources.

---

# Why `Promise<T>`?

An HTTP request is asynchronous.

Therefore:

```ts
request<Task>()
```

does not immediately return a `Task`.

It returns:

```text
Promise<Task>
```

After using:

```ts
const task = await request<Task>(url);
```

the `await` resolves the Promise and gives:

```text
task → Task
```

The flow is:

```text
request<Task>()
      ↓
Promise<Task>
      ↓ await
Task
```

For an array:

```text
request<Task[]>()
      ↓
Promise<Task[]>
      ↓ await
Task[]
```

---

# `async` / `await`

The HTTP client uses:

```ts
async
```

because `fetch()` is asynchronous.

Example:

```ts
const response = await fetch(url, options);
```

The `await` pauses the current async function until the Promise is fulfilled or rejected.

This gives us readable asynchronous code without manually chaining `.then()` calls.

---

# Request Options

The function accepts:

```ts
options?: RequestInit
```

`RequestInit` is a built-in browser type describing options accepted by `fetch()`.

It can contain things such as:

```ts
{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
}
```

The `?` means the options are optional.

This allows both:

```ts
request<Task>("/api/tasks/1");
```

and:

```ts
request<Task>("/api/tasks", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(request),
});
```

---

# HTTP Error Handling

The client checks:

```ts
if (!response.ok) {
  throw await createApiError(response);
}
```

This prevents unsuccessful HTTP responses from being treated as successful data.

The response may represent errors such as:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
500 Internal Server Error
```

Instead of handling these individually in every API function, the HTTP client provides one common error path.

---

# API Error Handling

The client reuses the `ApiError` contract created in Sprint 2:

```ts
export interface ApiError {
  success: false;
  message: string;
  errors: Record<string, string>;
}
```

When an HTTP error occurs, the client attempts to read the backend's JSON error response.

---

# Why `unknown`?

The backend response is external data.

Before validation, we cannot safely assume its type.

Therefore:

```ts
const errorData: unknown = await response.json();
```

is preferred over:

```ts
const errorData: any = await response.json();
```

`unknown` forces us to verify the value before using it.

This supports the Stage 4 mastery goal:

> **No unnecessary `any`.**

---

# API Error Type Guard

The client uses a type guard:

```ts
function isApiError(
  value: unknown
): value is ApiError {
  // validation
}
```

The expression:

```ts
value is ApiError
```

is a TypeScript type predicate.

It tells TypeScript:

> If this function returns `true`, treat `value` as an `ApiError`.

The validation uses techniques learned earlier:

* `typeof`
* `null` checks
* `in` operator
* literal value comparison

For example:

```ts
if (
  typeof value !== "object" ||
  value === null
) {
  return false;
}
```

Then required properties are checked:

```ts
if (
  !("success" in value) ||
  !("message" in value) ||
  !("errors" in value)
) {
  return false;
}
```

Finally, the important values are checked:

```ts
return (
  value.success === false &&
  typeof value.message === "string" &&
  typeof value.errors === "object" &&
  value.errors !== null
);
```

---

# Fallback Error

The backend might fail to return valid JSON.

For example:

```text
500 Internal Server Error
```

with an empty or non-JSON body.

In that case, the HTTP client creates a fallback error:

```ts
return {
  success: false,
  message: `Request failed with status ${response.status}.`,
  errors: {},
};
```

This means the caller still receives a consistent `ApiError` structure.

---

# Important TypeScript Concept

The following line:

```ts
return (await response.json()) as T;
```

uses a **type assertion**.

It tells TypeScript:

> Treat the parsed response as the expected type `T`.

For example:

```ts
request<Task>()
```

results in:

```ts
response.json() as Task
```

However, this does **not** perform runtime validation.

The frontend is expressing what it expects the backend to return.

This distinction is important:

```text
TypeScript
    ↓
compile-time type information

Backend JSON
    ↓
runtime data
```

If runtime schema validation is needed later, it can be introduced as a separate concern.

---

# Generic Reuse

The main advantage of the HTTP client is that the same function can support many response types.

### One Task

```ts
const task = await request<Task>(
  "/api/tasks/1"
);
```

Result:

```text
task → Task
```

### Multiple Tasks

```ts
const tasks = await request<Task[]>(
  "/api/tasks"
);
```

Result:

```text
tasks → Task[]
```

### One User

```ts
const user = await request<User>(
  "/api/users/1"
);
```

Result:

```text
user → User
```

### Multiple Users

```ts
const users = await request<User[]>(
  "/api/users"
);
```

Result:

```text
users → User[]
```

The HTTP implementation does not need separate functions for each resource.

---

# Architecture Decision

The HTTP client remains generic.

It should not contain:

```text
getTasks()
createTask()
deleteTask()
```

because those functions belong to the task-specific API/service layers.

The separation is:

```text
httpClient.ts
    ↓
Generic HTTP infrastructure

taskApi.ts
    ↓
Task-specific API operations

taskService.ts
    ↓
Application-level task operations
```

This keeps responsibilities separated.

---

# Backend Connection

The data flow is now:

```text
Spring Boot REST API
        ↓
       JSON
        ↓
TypeScript API Contract
        ↓
   request<T>()
        ↓
Typed application data
```

For example:

```ts
const task = await request<Task>(
  "/api/tasks/1"
);
```

The expected flow is:

```text
HTTP response
      ↓
JSON
      ↓
Task
      ↓
Promise<Task>
      ↓ await
Task
```

---

# Concepts Applied

This sprint reinforces:

* Generics
* `Promise<T>`
* `async`
* `await`
* `fetch()`
* `RequestInit`
* Type inference
* `unknown`
* Type assertions
* Type guards
* API contracts
* Error handling
* ES modules

---

# Deliverable

A reusable HTTP client:

```text
src/
└── api/
    └── httpClient.ts
```

The client can make typed requests such as:

```ts
request<Task>()
request<Task[]>()
request<User>()
request<User[]>()
```

while keeping HTTP logic independent from specific resources.

---

# Verification

The following should pass:

```bash
npm run type-check
```

```bash
npm run build
```

The application should still run:

```bash
npm run dev
```

The generic client should also be testable with different types.

Examples:

```ts
request<Task>()
request<Task[]>()
request<User>()
request<User[]>()
```

---

# Sprint Result

The project now has the low-level HTTP communication layer required to communicate with a REST API.

The architecture is now:

```text
UI
 ↓
Service
 ↓
API Client
 ↓
fetch()
 ↓
REST API
```

The API client is reusable and strongly typed, while task-specific API operations are intentionally left for the next sprint.

---

# Git Commit

```text
feat: add typed HTTP client
```
