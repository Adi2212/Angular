import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { User } from '../models/user.model';
import { Task } from '../models/task.model';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent {
  @Input() user?: User;
  @Input() tasks?: Task[];
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskCompleted = new EventEmitter<string>();

  /**
   * TasksService injected via Angular's modern `inject` function.
   */
  private tasksService = inject(TasksService);

  isAddingTask = false;

  get selectedUserTasks(): Task[] {
    if (!this.user) {
      return [];
    }
    return this.tasksService.getUserTasks(this.user.id);
  }

  onStartAddTask(): void {
    this.isAddingTask = true;
  }

  onCloseAddTask(): void {
    this.isAddingTask = false;
  }

  onAddTask(newTask: Task): void {
    this.taskAdded.emit(newTask);
    this.isAddingTask = false;
  }

  onCompleteTask(taskId: string): void {
    this.tasksService.removeTask(taskId);
    this.taskCompleted.emit(taskId);
  }
}
