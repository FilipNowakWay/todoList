import "./styles/reset.css";
import "./styles/main.css";
import "./styles/forms.css";
import {
  displayTaskForm,
  displayProjectForm,
  displayTasks,
  displayProjects
} from "./modules/display.js";
import { Task } from "./modules/task.js";
import { Project, defaultProject } from "./modules/project.js";
import { saveTasks, loadTasks } from "./modules/storage.js";

console.log("index.js loaded!");

// Load
displayProjects();

//default first load display
defaultProject.taskList = loadTasks(defaultProject.name);
displayTasks(defaultProject);

//
// Buttons
//

document.querySelector("#home").addEventListener("click", () => {
  displayTasks(defaultProject);
});
document.querySelector("#showTaskForm").addEventListener("click", () => {
  displayTaskForm();
});
document.querySelector("#showProjectForm").addEventListener("click", () => {
  displayProjectForm();
});
document.querySelector("#container").addEventListener("click", (e) => {
  if (e.target.id == "taskAddBtn") {
    const inputName = document.querySelector("#inputName");
    const inputDesc = document.querySelector("#inputDesc");
    const inputDate = document.querySelector("#inputDueDate");
    const inputPriority = document.querySelector("#inputPriority");

    console.log(
      inputName.value,
      inputDesc.value,
      inputDate.value,
      inputPriority.value,
    );
    const newTask = new Task(
      inputName.value,
      inputDesc.value,
      inputDate.value,
      inputPriority.value,
    );

    defaultProject.addTask(newTask);
    saveTasks(defaultProject);
    displayTasks(defaultProject);
  }
  return;
});



