import { loadTasks } from "./storage.js";
import { listProjects } from "./project.js";

const mainContainer = document.querySelector("#container");
const projectsNav = document.querySelector("#projectsNav");

export function displayTaskForm() {
  mainContainer.innerHTML = "";

  const formH1 = document.createElement("h1");
  formH1.textContent = "Add Task";

  const form = document.createElement("div");

  // Name
  const inputNameLabel = document.createElement("label");
  inputNameLabel.textContent = "Name: ";
  inputNameLabel.setAttribute("for", "inputName");
  const inputName = document.createElement("input");
  inputName.id = "inputName";

  // Desc
  const inputDescLabel = document.createElement("label");
  inputDescLabel.textContent = "Description: ";
  inputDescLabel.setAttribute("for", "inputDesc");
  const inputDesc = document.createElement("input");
  inputDesc.id = "inputDesc";

  // dueDate
  const inputDueDateLabel = document.createElement("label");
  inputDueDateLabel.textContent = "Due Date: ";
  inputDueDateLabel.setAttribute("for", "inputDueDate");
  const inputDueDate = document.createElement("input");
  inputDueDate.id = "inputDueDate";
  inputDueDate.type = "date";

  // Priority
  const priorityLabel = document.createElement("label");
  priorityLabel.setAttribute("for", "inputPriority");
  priorityLabel.textContent = "Priority:";

  const prioritySelect = document.createElement("select");
  prioritySelect.id = "inputPriority";
  prioritySelect.name = "priority";

  const lowOption = document.createElement("option");
  lowOption.value = "low";
  lowOption.textContent = "Low";

  const mediumOption = document.createElement("option");
  mediumOption.value = "medium";
  mediumOption.textContent = "Medium";
  mediumOption.selected = true;

  const highOption = document.createElement("option");
  highOption.value = "high";
  highOption.textContent = "High";

  prioritySelect.append(lowOption, mediumOption, highOption);
  form.append(
    inputNameLabel,
    inputName,
    inputDescLabel,
    inputDesc,
    inputDueDateLabel,
    inputDueDate,
    priorityLabel,
    prioritySelect,
  );

  const taskAddBtn = document.createElement("button");
  taskAddBtn.textContent = "Add Task";
  taskAddBtn.id = "taskAddBtn";
  mainContainer.append(formH1, form, taskAddBtn);
  return mainContainer;
}

export function displayTasks(project) {
  mainContainer.innerHTML = "";

  const taskList = document.createElement("div");
  taskList.id = "taskList";

  if (project.taskList.length === 0) {
    const emptyInfo = document.createElement("p");
    emptyInfo.textContent = "Brak zadań";
    taskList.appendChild(emptyInfo);
  }

  project.taskList.forEach((task, index) => {
    const newTaskElement = document.createElement("div");
    newTaskElement.dataset.index = index;

    const taskText = document.createElement("p");
    taskText.textContent = `${task.name} ${task.dueDate} ${task.priority} ${task.getDueInfo()}`;

    const taskDoneBtn = document.createElement("button");
    taskDoneBtn.textContent = `${task.getStatus()}`;
    taskDoneBtn.id = "taskDoneBtn";
    taskDoneBtn.dataset.index = index;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.id = "editBtn";
    editBtn.dataset.index = index;

    newTaskElement.append(taskText, taskDoneBtn, editBtn);
    taskList.appendChild(newTaskElement);
  });

  mainContainer.append(taskList);
}

export function displayProjectForm() {
  mainContainer.innerHTML = "";

  const projectFormContainer = document.createElement("div");

  const projectFormHeader = document.createElement("h1");
  projectFormHeader.textContent = "Add Project";
  projectFormHeader.id = "projectFormHeader";

  const inputProjectNameLabel = document.createElement("label");
  inputProjectNameLabel.textContent = "Project Name: ";
  inputProjectNameLabel.setAttribute("for", "inputProjectName");
  const inputProjectName = document.createElement("input");
  inputProjectName.id = "inputProjectName";
  const inputProjectAddBtn = document.createElement("button");
  inputProjectAddBtn.textContent = "Add Project";
  inputProjectAddBtn.id = "inputProjectAddBtn";

  projectFormContainer.append(
    projectFormHeader,
    inputProjectNameLabel,
    inputProjectName,
    inputProjectAddBtn,
  );

  mainContainer.append(projectFormContainer);
}

export function displayProjects() {
  projectsNav.innerHTML = "";

  listProjects.forEach((project) => {
    const buttonForProject = document.createElement("button");
    if (project.name == "defaultProject") return;
    else {
      buttonForProject.textContent = `${project.name}`;
      projectsNav.appendChild(buttonForProject);
    }
  });
}

export function displayTaskToday() {}
export function displayTaskThisWeek() {}
