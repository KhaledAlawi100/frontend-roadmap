import "./style.css";

import type { AppConfig } from "./types/app";

//Task and TaskStatus are TypeScript-only types, so this is a type-only import.
import type { Task, TaskStatus } from "./types/task";

import type { User } from "./types/user";

import type {
  TaskResponse,
  TasksResponse,
  CreateTaskRequest,
  UpdateTaskRequest,
  ApiError,
} from "./types/api";

import { request } from "./api/httpClient";

import type { TaskState } from "./types/app";

function handleTaskState(state: TaskState): string {
  if (state.status === "success") {
    return `Loaded ${state.data.length} tasks`;
  }

  if (state.status === "error") {
    return `Error: ${state.message}`;
  }

  if (state.status === "loading") {
    return "Loading tasks...";
  }

  return "Not started";
}

import { assertNever } from "./utils/assertNever";

function getTaskStateMessage(state: TaskState): string {
  if (state.status === "success") {
    if (state.data.length === 0) {
      return "No tasks found";
    }

    return `Loaded ${state.data.length} tasks`;
  }

  if (state.status === "error") {
    return `Failed: ${state.message}`;
  }

  if (state.status === "loading") {
    return "Loading tasks...";
  }

  if (state.status === "idle") {
    return "Waiting to load tasks";
  }

  return assertNever(state);
}
const task1: Task = {
  id: 1,
  title: "Learn TypeScript",
  description: "Learn the basics of TypeScript",
  completed: false,
  status: "IN_PROGRESS",
};
const task2: Task = {
  id: 2,
  title: "Build a project",
  description: "Build a project using TypeScript",
  completed: false,
  status: "TODO",
};

const state1: TaskState = {
  status: "success",
  data: [task1, task2],
};

const state2: TaskState = {
  status: "error",
  message: "Failed to load tasks",
};

const state3: TaskState = {
  status: "loading",
};

const state4: TaskState = {
  status: "idle",
};

console.log(state1);
console.log(state2);
console.log(state3);
console.log(state4);

interface ExampleUser {
  id: number;
  name: string;
  email: string;
}

async function testRequest(): Promise<void> {
  const user = await request<ExampleUser>(
    "https://jsonplaceholder.typicode.com/users/1",
  );

  console.log("User:", user);
}

void testRequest();

const CreateRequest: CreateTaskRequest = {
  title: "Learn TypeScript",
  description: "Learn the basics of TypeScript",
};

const UpdateRequest: UpdateTaskRequest = {
  completed: true,
  status: "COMPLETED",
};

const erros: ApiError = {
  success: false,
  message: "Validation failed",
  errors: {
    title: "Title is required",
    description: "Description must be at least 10 characters",
  },
};

const taskResponse: TaskResponse = {
  success: true,
  message: "Task retrieved successfully",
  data: {
    id: 1,
    title: "Learn TypeScript",
    description: "Learn the basics of TypeScript",
    completed: false,
    status: "IN_PROGRESS",
  },
};

const tasksResponse: TasksResponse = {
  success: true,
  message: "Tasks retrieved successfully",
  data: [
    {
      id: 1,
      title: "Learn TypeScript",
      description: "Learn the basics of TypeScript",
      completed: false,
      status: "IN_PROGRESS",
    },
    {
      id: 2,
      title: "Build a project",
      description: "Build a project using TypeScript",
      completed: false,
      status: "TODO",
    },
  ],
};

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

const config: AppConfig = {
  appName: "Task Manager",
  version: "1.0.0",
};

const user: User = {
  id: 1,
  name: "Khaled",
  email: "khaled@example.com",
};

const status: TaskStatus = "IN_PROGRESS";

const task: Task = {
  id: 1,
  title: "Learn TypeScript",
  description: "Learn the basics of TypeScript",
  completed: false,
  status: status,
};

// task.id=10;// This line will cause a TypeScript error because 'id' is readonly.

app.innerHTML = `
<mian> 
  <h1>${config.appName} v${config.version}</h1>
  <h2>User: ${user.name} (${user.email})</h2>
  <h3>Task: ${task.title}</h3>
  <p>Description: ${task.description}</p>
  <p>Status: ${task.status}</p>
  <p>Completed: ${task.completed}</p>
</main>
`;
