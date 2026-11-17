export class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }

  removeTask(index) {
    this.taskList.splice(index, 1);
  }
}
// list of projects
export const listProjects = [];

// making default project
export const defaultProject = new Project("defaultProject");
listProjects.push(defaultProject);
console.log(listProjects);

