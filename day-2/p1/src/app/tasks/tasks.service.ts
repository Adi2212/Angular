import { Injectable } from '@angular/core';
import { Task, NewTaskPayload } from '../models/task.model';
import { DUMMY_TASKS } from '../dummy-data';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: Task[] = DUMMY_TASKS;

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Retrieve all tasks.
   */
  getTasks(): Task[] {
    return [...this.tasks];
  }

  /**
   * Retrieve tasks assigned to a specific user.
   */
  getUserTasks(userId: string): Task[] {
    return this.tasks.filter((task) => task.userId === userId);
  }

  /**
   * Retrieve a single task by its unique ID.
   */
  getTaskById(taskId: string): Task | undefined {
    return this.tasks.find((task) => task.id === taskId);
  }

  /**
   * Add a new task to the collection.
   * Accepts either a complete Task object or a NewTaskPayload with a userId.
   */
  addTask(taskData: NewTaskPayload | Task, userId?: string): Task {
    const isCompleteTask = 'userId' in taskData && typeof (taskData as Task).userId === 'string';
    const assignedUserId = userId ?? (isCompleteTask ? (taskData as Task).userId : '');
    const taskId =
      'id' in taskData && (taskData as Task).id
        ? (taskData as Task).id
        : `task-${Date.now()}`;

    const newTask: Task = {
      id: taskId,
      userId: assignedUserId,
      title: taskData.title.trim(),
      summary: taskData.summary.trim(),
      dueDate: taskData.dueDate,
    };

    this.tasks = [newTask, ...this.tasks];
    this.saveToStorage();
    return newTask;
  }

  /**
   * Remove a task by its unique ID.
   */
  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveToStorage();
  }

  private saveToStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } catch {
        // Fallback gracefully if storage quota exceeded or disabled
      }
    }
  }

  private loadFromStorage(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          this.tasks = JSON.parse(storedTasks);
        }
      } catch {
        this.tasks = DUMMY_TASKS;
      }
    }
  }
}

// Export TaskService as an alias for TasksService for convenience
export { TasksService as TaskService };
