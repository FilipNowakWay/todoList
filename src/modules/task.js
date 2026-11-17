import { isPast, isToday, isThisWeek } from "date-fns";

export class Task {
  constructor(name, description, dueDate, priority, status = false) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  getStatus() {
    return this.status ? "Done" : "Todo";
  }

  changeStatusToggle() {
    this.status = !this.status;
  }

  update({ name, description, dueDate, priority }) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  isDueToday() {
    return Boolean(this.dueDate) && isToday(this.dueDate);
  }

  isDueThisWeek() {
    return Boolean(this.dueDate) && isThisWeek(this.dueDate);
  }

  getDueInfo() {
    if (!this.dueDate) return "No due date";
    if (isToday(this.dueDate)) return "Today";
    if (isPast(this.dueDate)) return "Overdue";
    if (isThisWeek(this.dueDate)) return "This Week";
    return "Upcoming";
  }
}
