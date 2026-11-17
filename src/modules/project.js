export class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }

  addTask(task) {
    this.taskList.push(task);
  }
}

// making default project
export const defaultProject = new Project("defaultProject");
