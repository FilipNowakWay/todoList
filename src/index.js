import "./styles/reset.css";
import "./styles/main.css";
import "./styles/forms.css";
import {
  displayTaskForm,
  displayProjectForm,
  displayTasks,
  displayProjects,
  displayEditTask,
  displayToday,
  displayThisWeek,
} from "./modules/display.js";
import { Task } from "./modules/task.js";
import {
  Project,
  defaultProject,
  listProjects,
  findProject,
} from "./modules/project.js";
import {
  saveTasks,
  loadTasks,
  saveProjects,
  loadProjects,
} from "./modules/storage.js";

const container = document.querySelector("#container");
const projectsNav = document.querySelector("#projectsNav");

//
// Load data
//

loadProjects().forEach((projectName) => {
  if (findProject(projectName)) return;
  const project = new Project(projectName);
  project.taskList = loadTasks(projectName);
});

defaultProject.taskList = loadTasks(defaultProject.name);

//
// View state
//

let activeProject = defaultProject;
let view = "project"; // "project" | "today" | "week"

function render() {
  if (view === "today") displayToday();
  else if (view === "week") displayThisWeek();
  else displayTasks(activeProject);

  displayProjects(view === "project" ? activeProject : null);
}

function showProject(project) {
  activeProject = project;
  view = "project";
  render();
}

//
// Helpers
//

function getRowContext(target) {
  const row = target.closest(".taskRow");
  if (!row) return null;

  const project = findProject(row.dataset.projectName);
  if (!project) return null;

  const index = Number(row.dataset.index);
  const task = project.taskList[index];
  if (!task) return null;

  return { project, index, task };
}

function readTaskForm(panel) {
  return {
    name: panel.querySelector("#inputName").value.trim(),
    description: panel.querySelector("#inputDesc").value.trim(),
    dueDate: panel.querySelector("#inputDueDate").value,
    priority: panel.querySelector("#inputPriority").value,
  };
}

//
// Navigation
//

document.querySelector("#home").addEventListener("click", () => {
  showProject(defaultProject);
});

document.querySelector("#today").addEventListener("click", () => {
  view = "today";
  render();
});

document.querySelector("#thisWeek").addEventListener("click", () => {
  view = "week";
  render();
});

document.querySelector("#showTaskForm").addEventListener("click", () => {
  displayTaskForm(activeProject);
});

document.querySelector("#showProjectForm").addEventListener("click", () => {
  displayProjectForm();
});

projectsNav.addEventListener("click", (e) => {
  const button = e.target.closest(".projectBtn");
  if (!button) return;

  const project = findProject(button.dataset.projectName);
  if (project) showProject(project);
});

//
// Click handling
//

container.addEventListener("click", (e) => {
  // Add task
  if (e.target.id === "taskAddBtn") {
    const panel = document.querySelector("#taskForm");
    const values = readTaskForm(panel);

    if (!values.name) {
      panel.querySelector("#inputName").focus();
      return;
    }

    const project = findProject(
      panel.querySelector("#projectSelect").value,
    );
    if (!project) return;

    const newTask = new Task(
      values.name,
      values.description,
      values.dueDate,
      values.priority,
    );

    project.addTask(newTask);
    saveTasks(project);
    showProject(project);
    return;
  }

  // Save edited task
  if (e.target.id === "taskEditSaveBtn") {
    const panel = document.querySelector("#taskForm");
    const project = findProject(panel.dataset.projectName);
    if (!project) return;

    const index = Number(panel.dataset.index);
    const task = project.taskList[index];
    if (!task) return;

    const values = readTaskForm(panel);
    if (!values.name) {
      panel.querySelector("#inputName").focus();
      return;
    }

    task.update(values);
    saveTasks(project);
    render();
    return;
  }

  // Cancel editing
  if (e.target.id === "taskCancelBtn") {
    render();
    return;
  }

  // Add project
  if (e.target.id === "inputProjectAddBtn") {
    const input = document.querySelector("#inputProjectName");
    const name = input.value.trim();

    if (!name) {
      input.focus();
      return;
    }

    const isDuplicate = listProjects.some(
      (project) => project.name.toLowerCase() === name.toLowerCase(),
    );
    if (isDuplicate) {
      input.focus();
      return;
    }

    const newProject = new Project(name);
    saveProjects(listProjects);
    showProject(newProject);
    return;
  }

  // Task row actions
  const context = getRowContext(e.target);
  if (!context) return;

  if (e.target.closest(".taskDoneBtn")) {
    context.task.changeStatusToggle();
    saveTasks(context.project);
    render();
    return;
  }

  if (e.target.closest(".editBtn")) {
    displayEditTask(context.project, context.index);
    return;
  }

  if (e.target.closest(".deleteBtn")) {
    context.project.removeTask(context.index);
    saveTasks(context.project);
    render();
    return;
  }
});

render();
