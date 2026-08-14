import type { Task } from "../types/task";

function createStatusElement(task: Task): HTMLSpanElement {
  const status = document.createElement("span");

  status.textContent = task.status;
  status.classList.add("task-status");

  if (task.status === "TODO") {
    status.classList.add("status-todo");
  }

  if (task.status === "IN_PROGRESS") {
    status.classList.add("status-in-progress");
  }

  if (task.status === "COMPLETED") {
    status.classList.add("status-completed");
  }

  return status;
}

function updateStatusElement(status: HTMLSpanElement, task: Task): void {
  status.textContent = task.status;

  status.className = "task-status";

  if (task.status === "TODO") {
    status.classList.add("status-todo");
  }

  if (task.status === "IN_PROGRESS") {
    status.classList.add("status-in-progress");
  }

  if (task.status === "COMPLETED") {
    status.classList.add("status-completed");
  }
}

function createCompleteButton(
  task: Task,
  completed: HTMLSpanElement,
  card: HTMLElement,
  status: HTMLSpanElement,
  inProgressButton: HTMLButtonElement
): HTMLButtonElement {
  const button = document.createElement("button");

 
  button.textContent = task.completed
    ? "Mark as Incomplete"
    : "Mark as Complete";

  button.addEventListener("click", () => {
    task.completed = !task.completed;

    completed.textContent = task.completed ? "Completed" : "Not completed";

    button.textContent = task.completed
      ? "Mark as Incomplete"
      : "Mark as Complete";

    card.classList.toggle("task-completed", task.completed);

    task.status = task.completed ? "COMPLETED" : "TODO";

    if (task.completed) {
        inProgressButton.disabled = true;
    } else {
        inProgressButton.disabled = false;
    }

    updateStatusElement(status, task);
  });

  return button;
}

function createMakeInProgressButton(
  task: Task,
  status: HTMLSpanElement,
  
): HTMLButtonElement {
  const button = document.createElement("button");

  button.textContent = "Mark as In Progress";

  button.disabled = task.completed || task.status === "IN_PROGRESS";

  button.addEventListener("click", () => {
    task.status = "IN_PROGRESS";

    button.disabled = true;

    updateStatusElement(status, task);
  });

  return button;
}

export function renderTask(task: Task): HTMLElement {
  const card = document.createElement("article");

  card.classList.add("task-card");

  if (task.completed) {
    card.classList.add("task-completed");
  }

  const title = document.createElement("h3");

  title.textContent = task.title;

  const description = document.createElement("p");

  description.textContent = task.description ?? "";

  const status = createStatusElement(task);

  const completed = document.createElement("span");

  completed.textContent = task.completed ? "Completed" : "Not completed";

  const makeInProgressButton = createMakeInProgressButton(task, status);
  const completeButton = createCompleteButton(task, completed, card, status, makeInProgressButton);

  const container = document.createElement("div");

  container.classList.add("task-actions");

  container.append(status, completed, completeButton, makeInProgressButton);

  card.append(title, description, container);

  return card;
}

export function renderTasks(tasks: Task[]): HTMLElement[] {
  return tasks.map(renderTask);
}
