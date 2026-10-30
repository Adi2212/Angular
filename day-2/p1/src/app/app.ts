import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import { User } from './models/user.model';
import { Task } from './models/task.model';
import { DUMMY_USERS } from './dummy-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, UserComponent, TasksComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  /**
   * TasksService injected via Angular's modern `inject` function.
   */
  private tasksService = inject(TasksService);

  /**
   * Local array of users storing id, name, and avatar.
   */
  users: User[] = DUMMY_USERS;

  /**
   * Currently active/selected user.
   */
  selectedUser: User | undefined;

  /**
   * Live task list obtained through TasksService.
   */
  get tasks(): Task[] {
    return this.tasksService.getTasks();
  }

  ngOnInit() {
    // Select the first user by default for immediate preview
    if (this.users.length > 0) {
      this.selectedUser = this.users[0];
    }
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }

  onTaskAdded(newTask: Task) {
    // Managed centrally by TasksService
  }

  onTaskCompleted(taskId: string) {
    this.tasksService.removeTask(taskId);
  }
}
