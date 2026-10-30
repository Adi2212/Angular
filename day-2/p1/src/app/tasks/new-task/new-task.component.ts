import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) userName!: string;

  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<Task>();

  private tasksService = inject(TasksService);

  enteredTitle = '';
  enteredSummary = '';
  enteredDueDate = '';
  customTaskId = `task-${Date.now().toString().slice(-4)}`;

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if (!this.enteredTitle.trim() || !this.enteredSummary.trim() || !this.enteredDueDate) {
      alert('Please fill out all required fields.');
      return;
    }

    const createdTask = this.tasksService.addTask(
      {
        id: this.customTaskId.trim() || `task-${Date.now()}`,
        title: this.enteredTitle.trim(),
        summary: this.enteredSummary.trim(),
        dueDate: this.enteredDueDate,
      },
      this.userId
    );

    this.add.emit(createdTask);
    this.close.emit();
  }
}
