import { Task } from "./task.js";

export function saveTasks(project) {
  localStorage.setItem(project.name, JSON.stringify(project.taskList));
}

export function loadTasks(projectName) {
  const raw = localStorage.getItem(projectName);
  if (!raw) return [];
  else {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(
      (task) =>
        new Task(
          task.name,
          task.description,
          task.dueDate,
          task.priority,
          task.status,
        ),
    );
  }
}


