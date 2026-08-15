import "./style.css";

import { getTasks } from "./api/taskApi";

import { renderTasks } from "./ui/taskList";

import { renderTaskForm } from "./ui/taskForm";

import {
  renderLoadingState,
  renderEmptyState,
  renderErrorState,
} from "./ui/taskState";

import type { Task } from "./types/task";

import type { TaskFilter } from "./types/taskFilter";

import type { TaskState } from "./types/app";

import { getFilteredTasks } from "./utils/taskFilter";

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

        <div class="task-filters">
          <input
            id="task-search"
            type="search"
            placeholder="Search tasks..."
          />

          <select id="task-filter">
            <option value="ALL">All</option>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

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

  const searchInput = document.querySelector<HTMLInputElement>("#task-search");

  const filterSelect =
    document.querySelector<HTMLSelectElement>("#task-filter");

  if (
    !taskList ||
    !createTaskForm ||
    !editSection ||
    !editTaskForm ||
    !searchInput ||
    !filterSelect
  ) {
    throw new Error("Required UI elements not found");
  }

  // =========================
  // Application State
  // =========================


  let currentFilter: TaskFilter = "ALL";

  let taskState: TaskState = {
    status: "idle",
  };

  // =========================
  // Render Task State
  // =========================

  function renderTaskState(): void {
    if (taskState.status === "idle") {
      taskList!.replaceChildren();

      return;
    }

    if (taskState.status === "loading") {
      taskList!.replaceChildren(renderLoadingState());

      return;
    }

    if (taskState.status === "error") {
      taskList!.replaceChildren(renderErrorState(taskState.message, loadTasks));

      return;
    }

    if (taskState.status === "success") {
      const filteredTasks = getFilteredTasks(
        taskState.data,
        currentFilter,
        searchInput!.value,
      );

      if (filteredTasks.length === 0) {
        taskList!.replaceChildren(renderEmptyState());

        return;
      }

      const taskCards = renderTasks(filteredTasks, handleEdit);

      taskList!.replaceChildren(...taskCards);

      return;
    }
  }

  // =========================
  // Load Tasks
  // =========================

  async function loadTasks(): Promise<void> {
    taskState = {
      status: "loading",
    };

    renderTaskState();

    try {
      const loadedTasks = await getTasks();

      taskState = {
        status: "success",
        data: loadedTasks,
      };

      renderTaskState();
    } catch (error) {
      console.error("Failed to load tasks:", error);

      taskState = {
        status: "error",
        message: "Failed to load tasks.",
      };

      renderTaskState();
    }
  }
  // =========================
  // Refresh Tasks
  // =========================

  const refreshTasks = (): Promise<void> => {
    return loadTasks();
  };

  // =========================
  // Edit Task
  // =========================

  const handleEdit = (task: Task): void => {
    editSection.hidden = false;

    editTaskForm.replaceChildren();

    const form = renderTaskForm(task, refreshTasks);

    editTaskForm.append(form);
  };

  // =========================
  // Search
  // =========================

  searchInput.addEventListener("input", () => {
    if (taskState.status === "success") {
      renderTaskState();
    }
  });

  // =========================
  // Status Filter
  // =========================

  filterSelect.addEventListener("change", () => {
    currentFilter = filterSelect.value as TaskFilter;

    if (taskState.status === "success") {
      renderTaskState();
    }
  });

  // =========================
  // Create Task
  // =========================

  const createForm = renderTaskForm(undefined, refreshTasks);

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
      <p>Failed to initialize application.</p>
    </main>
  `;
});
