
export function renderLoadingState(): HTMLElement {
  const container = document.createElement("div");

  container.classList.add("task-state", "task-state-loading");

  const message = document.createElement("p");

  message.textContent = "Loading tasks...";

  container.append(message);

  return container;
}

export function renderEmptyState(): HTMLElement {
  const container = document.createElement("div");

  container.classList.add("task-state", "task-state-empty");

  const message = document.createElement("p");

  message.textContent = "No tasks found.";

  container.append(message);

  return container;
}

export function renderErrorState(
  message: string,
  onRetry: () => void,
): HTMLElement {
  const container = document.createElement("div");

  container.classList.add("task-state", "task-state-error");

  const errorMessage = document.createElement("p");

  errorMessage.textContent = message;

  const retryButton = document.createElement("button");

  retryButton.type = "button";
  retryButton.textContent = "Retry";

  retryButton.addEventListener("click", onRetry);

  container.append(errorMessage, retryButton);

  return container;
}
