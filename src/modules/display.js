import { loadTasks } from "./storage.js";

const mainContainer = document.querySelector("#container");

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

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Add Task";
  submitBtn.id = "submitBtn";
  mainContainer.append(formH1, form, submitBtn);
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
    taskText.textContent = `${task.name} ${task.dueDate} ${task.priority} ${task.getStatus()} ${task.getDueInfo()}`;
    newTaskElement.append(taskText);

    taskList.appendChild(newTaskElement);
  });

  mainContainer.append(taskList);
}

export function displayProjectForm() {
  //   <form id="formAddProject" class="hidden">
  //     <h2>Add Project</h2>
  //
  //     <label for="projectName">Name:</label>
  //     <input type="text" id="projectName" name="projectName" required>
  //
  //     <button type="submit" id="addProject" class="btn">Add Project</button>
  //   </form>
  mainContainer.innerHTML = "";
}
