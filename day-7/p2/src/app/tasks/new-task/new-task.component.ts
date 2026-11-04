import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

import { TasksService } from '../tasks.service';

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (component.submitted) {
    return true;
  }
  if (
    component.enteredTitle() ||
    component.enteredSummary() ||
    component.enteredDate()
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose any unsaved task data.'
    );
  }
  return true;
};

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;

  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit(): void {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }

  onCancel(): void {
    this.router.navigate(['/users', this.userId(), 'tasks']);
  }
}
