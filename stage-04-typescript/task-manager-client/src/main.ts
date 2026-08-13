import "./style.css";

import type {AppConfig} from "./types/app";

//Task and TaskStatus are TypeScript-only types, so this is a type-only import.
import type {Task,TaskStatus} from "./types/task";

import type {User} from "./types/user";

import type {TaskResponse,TasksResponse,CreateTaskRequest,UpdateTaskRequest,ApiError} from "./types/api";


const CreateRequest: CreateTaskRequest = {
   title: "Learn TypeScript",
   description: "Learn the basics of TypeScript"
};


const UpdateRequest: UpdateTaskRequest = {

  completed: true,
  status: "COMPLETED"

}

const erros : ApiError = {
  success: false,
  message: "Validation failed",
  errors: {
    title: "Title is required",
    description: "Description must be at least 10 characters"
  }
}

const taskResponse: TaskResponse = {
  success: true,
  message: "Task retrieved successfully",
  data: {
    id: 1,
    title: "Learn TypeScript",
    description: "Learn the basics of TypeScript",
    completed: false,
    status: "IN_PROGRESS"
  }
}

const tasksResponse: TasksResponse = {
  success: true,
  message: "Tasks retrieved successfully",
  data: [
    {
      id: 1,
      title: "Learn TypeScript",
      description: "Learn the basics of TypeScript",
      completed: false,
      status: "IN_PROGRESS"
    },
    {
      id: 2,
      title: "Build a project",
      description: "Build a project using TypeScript",
      completed: false,
      status: "TODO"
    }
  ]
}


const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

const config: AppConfig = {
  appName: "Task Manager",
  version: "1.0.0"
};

const user : User = {
  id: 1,
  name:"Khaled",
  email:"khaled@example.com"
}

const status: TaskStatus = "IN_PROGRESS";

const task:Task={
   id: 1,
  title: "Learn TypeScript",
  description: "Learn the basics of TypeScript",
  completed: false,
  status: status
}

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
`
