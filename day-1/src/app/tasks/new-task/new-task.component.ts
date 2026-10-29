import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

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

    const newTask: Task = {
      id: this.customTaskId.trim() || `task-${Date.now()}`,
      userId: this.userId,
      title: this.enteredTitle.trim(),
      summary: this.enteredSummary.trim(),
      dueDate: this.enteredDueDate,
    };

    this.add.emit(newTask);
  }
}
