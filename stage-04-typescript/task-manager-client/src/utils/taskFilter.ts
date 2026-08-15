import type { Task } from "../types/task";

import type { TaskFilter } from "../types/taskFilter";

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === "ALL") {
    return tasks;
  }

  return tasks.filter((task) => task.status === filter);
}

export function searchTasks(tasks: Task[], searchTerm: string): Task[] {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();

  if (normalizedSearchTerm === "") {
    return tasks;
  }

  return tasks.filter((task) =>
    task.title.toLowerCase().includes(normalizedSearchTerm),
  );
}

export function getFilteredTasks(
  tasks: Task[],
  filter: TaskFilter,
  searchTerm: string,
): Task[] {
  const filteredTasks = filterTasks(tasks, filter);

  return searchTasks(filteredTasks, searchTerm);
}