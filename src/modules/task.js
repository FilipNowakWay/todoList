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

  getDueInfo() {
    if (isPast(this.dueDate)) return "Overdue";
    else if (isToday(this.dueDate)) return "Today";
    else if (isThisWeek(this.dueDate)) return "This Week";
    return "Upcoming";
  }
}
