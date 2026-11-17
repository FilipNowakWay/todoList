import { Task } from "./task.js";

const PROJECTS_KEY = "todo.projects";

export function saveTasks(project) {
  localStorage.setItem(project.name, JSON.stringify(project.taskList));
}

export function loadTasks(projectName) {
  const raw = localStorage.getItem(projectName);
  if (!raw) return [];

  try {
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
  } catch {
    return [];
  }
}

export function saveProjects(projects) {
  localStorage.setItem(
    PROJECTS_KEY,
    JSON.stringify(projects.map((project) => project.name)),
  );
}

export function loadProjects() {
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (name) => typeof name === "string" && name.trim().length > 0,
    );
  } catch {
    return [];
  }
}
