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


