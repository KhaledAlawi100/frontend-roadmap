import "./style.css";

import { getTasks } from "./api/taskApi";

import { renderTasks } from "./ui/taskList";

import { renderTaskForm } from "./ui/taskForm";

import type { Task } from "./types/task";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App container not found");
}

const appRoot = app;

async function init(): Promise<void> {
  appRoot.innerHTML = `
    <main>
      <h1>Task Manager</h1>

      <section>
        <h2>Tasks</h2>

        <div id="task-list" class="task-list"></div>
      </section>

      <section>
        <h2>Create Task</h2>

        <div id="create-task-form"></div>
      </section>

      <section id="edit-section" hidden>
        <h2>Edit Task</h2>

        <div id="edit-task-form"></div>
      </section>
    </main>
  `;

  const taskList = document.querySelector<HTMLDivElement>("#task-list");

  const createTaskForm =
    document.querySelector<HTMLDivElement>("#create-task-form");

  const editSection = document.querySelector<HTMLElement>("#edit-section");

  const editTaskForm =
    document.querySelector<HTMLDivElement>("#edit-task-form");

  if (!taskList || !createTaskForm || !editSection || !editTaskForm) {
    throw new Error("Required UI elements not found");
  }

  // =========================
  // Load Tasks
  // =========================

  async function loadTasks(): Promise<void> {
    try {
      if (taskList) {
        taskList.textContent = "Loading tasks...";
      }

      const tasks = await getTasks();

      const taskCards = renderTasks(tasks, handleEdit);

      if (taskList) {
        taskList.replaceChildren(...taskCards);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);

      if (taskList) {
        taskList.textContent = "Failed to load tasks.";
      }
    }
  }

  // =========================
  // Edit Task
  // =========================

  const handleEdit = (task: Task): void => {
    editSection.hidden = false;

    editTaskForm.replaceChildren();

    const form = renderTaskForm(task, loadTasks);

    editTaskForm.append(form);
  };

  // =========================
  // Create Task
  // =========================

  const createForm = renderTaskForm(undefined, loadTasks);

  createTaskForm.append(createForm);

  // =========================
  // Initial Load
  // =========================

  await loadTasks();
}

init().catch((error) => {
  console.error("Failed to initialize application:", error);

  appRoot.innerHTML = `
    <main>
      <h1>Task Manager</h1>
      <p>Failed to load tasks.</p>
    </main>
  `;
});
