import "./style.css";

import { getTasks } from "./api/taskApi";

import { renderTasks } from "./ui/taskList";

import { renderTaskForm } from "./ui/taskForm";

import type { Task } from "./types/task";

import type { TaskFilter } from "./types/taskFilter";

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

  let tasks: Task[] = [];

  let currentFilter: TaskFilter = "ALL";

  // =========================
  // Render Tasks
  // =========================

  function renderFilteredTasks(): void {
    const filteredTasks = getFilteredTasks(
      tasks,
      currentFilter,
      searchInput!.value,
    );

    const taskCards = renderTasks(filteredTasks, handleEdit);

    taskList!.replaceChildren(...taskCards);
  }

  // =========================
  // Load Tasks
  // =========================

  async function loadTasks(): Promise<void> {
    try {
      taskList!.textContent = "Loading tasks...";

      tasks = await getTasks();

      renderFilteredTasks();
    } catch (error) {
      console.error("Failed to load tasks:", error);

      taskList!.textContent = "Failed to load tasks.";
    }
  }

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
    renderFilteredTasks();
  });

  // =========================
  // Status Filter
  // =========================

  filterSelect.addEventListener("change", () => {
    currentFilter = filterSelect.value as TaskFilter;

    renderFilteredTasks();
  });

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
