import type { CreateTaskRequest, UpdateTaskRequest } from "../types/api";

import type { Task } from "../types/task";

import { createTask, updateTask } from "../api/taskApi";

export function renderTaskForm(
  task?: Task,
  onTaskChanged?: () => Promise<void>,
): HTMLFormElement {
  const isEditMode = task !== undefined;

  const form = document.createElement("form");

  form.classList.add("task-form");

  // =========================
  // Title
  // =========================

  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title";

  const titleInput = document.createElement("input");

  titleInput.type = "text";
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.minLength = 3;

  if (task) {
    titleInput.value = task.title;
  }

  titleLabel.append(titleInput);

  // =========================
  // Description
  // =========================

  const descriptionLabel = document.createElement("label");
  descriptionLabel.textContent = "Description";

  const descriptionInput = document.createElement("textarea");

  descriptionInput.name = "description";

  if (task) {
    descriptionInput.value = task.description ?? "";
  }

  descriptionLabel.append(descriptionInput);

  // =========================
  // Submit Button
  // =========================

  const submitButton = document.createElement("button");

  submitButton.type = "submit";

  submitButton.textContent = isEditMode ? "Update Task" : "Create Task";

  // =========================
  // Form
  // =========================

  form.append(titleLabel, descriptionLabel, submitButton);

  // =========================
  // Submit Event
  // =========================

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    // =========================
    // Validation
    // =========================

    if (title.length < 3) {
      titleInput.focus();
      return;
    }

    // =========================
    // Create
    // =========================

    if (!isEditMode) {
      const request: CreateTaskRequest = {
        title,
        description: description || undefined,
      };

      try {
        const createdTask = await createTask(request);

        console.log("Task created:", createdTask);

        form.reset();

        if (onTaskChanged) {
          await onTaskChanged();
        }
      } catch (error) {
        console.error("Failed to create task:", error);
      }

      return;
    }

    // =========================
    // Update
    // =========================

    const request: UpdateTaskRequest = {
      title,
      description: description || undefined,
    };

    try {
      const updatedTask = await updateTask(task.id, request);

      console.log("Task updated:", updatedTask);

      if (onTaskChanged) {
        await onTaskChanged();
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  });

  return form;
}
