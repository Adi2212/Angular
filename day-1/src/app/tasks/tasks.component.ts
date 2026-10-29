import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { DUMMY_TASKS } from '../dummy-data';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input() user?: User;

  /**
   * Local tasks array storing task items.
   * Consists of task id, userId, title, summary, dueDate.
   */
  @Input() tasks: Task[] = DUMMY_TASKS;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskCompleted = new EventEmitter<string>();

  isAddingTask = false;

  get selectedUserTasks(): Task[] {
    if (!this.user) {
      return [];
    }
    return this.tasks.filter((task) => task.userId === this.user!.id);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  onAddTask(newTask: Task) {
    this.tasks = [newTask, ...this.tasks];
    this.taskAdded.emit(newTask);
    this.isAddingTask = false;
  }

  onCompleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.taskCompleted.emit(taskId);
  }
}
