import { listProjects, defaultProject } from "./project.js";

const mainContainer = document.querySelector("#container");
const projectsNav = document.querySelector("#projectsNav");

function createProjectSelect(selectedProjectName) {
  const projectSelect = document.createElement("select");
  projectSelect.id = "projectSelect";
  projectSelect.name = "project";

  listProjects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent =
      project.name === defaultProject.name ? "Default" : project.name;
    option.selected = project.name === selectedProjectName;
    projectSelect.append(option);
  });

  return projectSelect;
}

function createTaskFormPanel({
  task = null,
  project = defaultProject,
  index = null,
} = {}) {
  const panel = document.createElement("div");
  panel.id = "taskForm";

  if (task) {
    panel.dataset.projectName = project.name;
    panel.dataset.index = String(index);
  }

  // Name
  const inputNameLabel = document.createElement("label");
  inputNameLabel.textContent = "Name: ";
  inputNameLabel.setAttribute("for", "inputName");
  const inputName = document.createElement("input");
  inputName.id = "inputName";
  inputName.value = task ? task.name : "";

  // Desc
  const inputDescLabel = document.createElement("label");
  inputDescLabel.textContent = "Description: ";
  inputDescLabel.setAttribute("for", "inputDesc");
  const inputDesc = document.createElement("input");
  inputDesc.id = "inputDesc";
  inputDesc.value = task ? task.description ?? "" : "";

  // dueDate
  const inputDueDateLabel = document.createElement("label");
  inputDueDateLabel.textContent = "Due Date: ";
  inputDueDateLabel.setAttribute("for", "inputDueDate");
  const inputDueDate = document.createElement("input");
  inputDueDate.id = "inputDueDate";
  inputDueDate.type = "date";
  inputDueDate.value = task ? task.dueDate ?? "" : "";

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

  const highOption = document.createElement("option");
  highOption.value = "high";
  highOption.textContent = "High";

  const selectedPriority = task ? task.priority : "medium";
  lowOption.selected = selectedPriority === "low";
  mediumOption.selected = selectedPriority === "medium";
  highOption.selected = selectedPriority === "high";

  prioritySelect.append(lowOption, mediumOption, highOption);

  panel.append(
    inputNameLabel,
    inputName,
    inputDescLabel,
    inputDesc,
    inputDueDateLabel,
    inputDueDate,
    priorityLabel,
    prioritySelect,
  );

  // Project is only chosen when creating a task
  if (!task) {
    const projectLabel = document.createElement("label");
    projectLabel.setAttribute("for", "projectSelect");
    projectLabel.textContent = "Project:";
    panel.append(projectLabel, createProjectSelect(project.name));
  }

  return panel;
}

export function displayTaskForm(project = defaultProject) {
  mainContainer.innerHTML = "";

  const formH1 = document.createElement("h1");
  formH1.textContent = "Add Task";

  const taskAddBtn = document.createElement("button");
  taskAddBtn.type = "button";
  taskAddBtn.textContent = "Add Task";
  taskAddBtn.id = "taskAddBtn";

  mainContainer.append(
    formH1,
    createTaskFormPanel({ project }),
    taskAddBtn,
  );
}

export function displayEditTask(project, index) {
  const task = project.taskList[index];
  if (!task) return;

  mainContainer.innerHTML = "";

  const formH1 = document.createElement("h1");
  formH1.textContent = "Edit Task";

  const taskEditSaveBtn = document.createElement("button");
  taskEditSaveBtn.type = "button";
  taskEditSaveBtn.textContent = "Save";
  taskEditSaveBtn.id = "taskEditSaveBtn";

  const taskCancelBtn = document.createElement("button");
  taskCancelBtn.type = "button";
  taskCancelBtn.textContent = "Cancel";
  taskCancelBtn.id = "taskCancelBtn";

  mainContainer.append(
    formH1,
    createTaskFormPanel({ task, project, index }),
    taskEditSaveBtn,
    taskCancelBtn,
  );
}

function createTaskRow(task, project, index) {
  const newTaskElement = document.createElement("div");
  newTaskElement.className = "taskRow";
  newTaskElement.dataset.projectName = project.name;
  newTaskElement.dataset.index = index;
  if (task.status) newTaskElement.classList.add("done");

  const taskText = document.createElement("p");
  taskText.textContent = `${task.name} ${task.dueDate} ${task.priority} ${task.getDueInfo()}`;

  const taskDoneBtn = document.createElement("button");
  taskDoneBtn.type = "button";
  taskDoneBtn.textContent = task.getStatus();
  taskDoneBtn.classList.add("taskDoneBtn");

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "Edit";
  editBtn.classList.add("editBtn");

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");

  newTaskElement.append(taskText, taskDoneBtn, editBtn, deleteBtn);
  return newTaskElement;
}

function renderTaskRows(headingText, rows, emptyText) {
  mainContainer.innerHTML = "";

  if (headingText) {
    const heading = document.createElement("h1");
    heading.textContent = headingText;
    mainContainer.append(heading);
  }

  const taskList = document.createElement("div");
  taskList.id = "taskList";

  if (rows.length === 0) {
    const emptyInfo = document.createElement("p");
    emptyInfo.textContent = emptyText;
    taskList.appendChild(emptyInfo);
  }

  rows.forEach(({ task, project, index }) => {
    taskList.appendChild(createTaskRow(task, project, index));
  });

  mainContainer.append(taskList);
}

export function displayTasks(project) {
  const rows = project.taskList.map((task, index) => ({
    task,
    project,
    index,
  }));

  renderTaskRows(
    project.name === defaultProject.name ? "Home" : project.name,
    rows,
    "Brak zadań",
  );
}

function collectRows(predicate) {
  const rows = [];

  listProjects.forEach((project) => {
    project.taskList.forEach((task, index) => {
      if (predicate(task)) rows.push({ task, project, index });
    });
  });

  return rows;
}

export function displayToday() {
  renderTaskRows(
    "Today",
    collectRows((task) => task.isDueToday()),
    "Brak zadań na dziś",
  );
}

export function displayThisWeek() {
  renderTaskRows(
    "This Week",
    collectRows((task) => task.isDueThisWeek()),
    "Brak zadań w tym tygodniu",
  );
}

export function displayProjectForm() {
  mainContainer.innerHTML = "";

  const projectFormContainer = document.createElement("div");
  projectFormContainer.id = "projectForm";
  const projectFormHeader = document.createElement("h1");
  projectFormHeader.textContent = "Add Project";
  projectFormHeader.id = "projectFormHeader";

  const inputProjectNameLabel = document.createElement("label");
  inputProjectNameLabel.textContent = "Project Name: ";
  inputProjectNameLabel.setAttribute("for", "inputProjectName");
  const inputProjectName = document.createElement("input");
  inputProjectName.id = "inputProjectName";
  const inputProjectAddBtn = document.createElement("button");
  inputProjectAddBtn.type = "button";
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

export function displayProjects(activeProject = null) {
  projectsNav.innerHTML = "";

  listProjects.forEach((project) => {
    if (project.name === defaultProject.name) return;

    const buttonForProject = document.createElement("button");
    buttonForProject.type = "button";
    buttonForProject.textContent = project.name;
    buttonForProject.classList.add("projectBtn");
    buttonForProject.dataset.projectName = project.name;

    if (activeProject && project.name === activeProject.name) {
      buttonForProject.classList.add("active");
    }

    projectsNav.appendChild(buttonForProject);
  });
}
