import { Injectable } from '@angular/core';
import { Task, NewTaskPayload } from '../models/task.model';
import { DUMMY_TASKS } from '../dummy-data';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  /**
   * Internal tasks array initialized with default dummy data.
   */
  private tasks: Task[] = DUMMY_TASKS;

  constructor() {
    // Check for tasks in localStorage; if not present, use the initial task array
    const storedTasks =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem('tasks') || localStorage.getItem('task')
        : null;

    if (storedTasks) {
      try {
        this.tasks = JSON.parse(storedTasks);
      } catch {
        // Fallback to task array if JSON parsing fails
        this.tasks = DUMMY_TASKS;
      }
    } else {
      // Not present in localStorage: use task array
      this.tasks = DUMMY_TASKS;
    }
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
    this.saveTasks();
    return newTask;
  }

  /**
   * Remove a task by its unique ID.
   */
  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  /**
   * Persist current task list to localStorage.
   */
  private saveTasks(): void {
    if (typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      } catch {
        // Fallback gracefully if storage quota exceeded or disabled
      }
    }
  }

  /**
   * Backward-compatible alias for storage persistence.
   */
  private saveToStorage(): void {
    this.saveTasks();
  }
}

// Export TaskService as an alias for TasksService for convenience
export { TasksService as TaskService };
