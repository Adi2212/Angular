import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortPipe } from '../../pipes/sort.pipe';
import { ImpureSortPipe } from '../../pipes/impure-sort.pipe';

@Component({
  selector: 'app-pure-impure',
  standalone: true,
  imports: [CommonModule, FormsModule, SortPipe, ImpureSortPipe],
  templateUrl: './pure-impure.component.html',
  styleUrl: './pure-impure.component.css'
})
export class PureImpureComponent {
  // Shared item array
  items: string[] = ['React', 'Angular', 'Vue', 'Svelte'];

  newItemName = '';
  changeDetectionTriggers = 0;

  get pureExecutionCount(): number {
    return SortPipe.executionCount;
  }

  get impureExecutionCount(): number {
    return ImpureSortPipe.executionCount;
  }

  // 1. MUTATING IN-PLACE (Same Array Reference)
  addMutatedInPlace() {
    const framework = this.newItemName.trim() || `Framework-${Math.floor(Math.random() * 100)}`;
    this.items.push(framework);
    this.newItemName = '';
  }

  // 2. IMMUTABLE UPDATE (New Array Reference)
  addImmutable() {
    const framework = this.newItemName.trim() || `Framework-${Math.floor(Math.random() * 100)}`;
    this.items = [...this.items, framework];
    this.newItemName = '';
  }

  // Trigger empty change detection cycle
  triggerChangeDetection() {
    this.changeDetectionTriggers++;
  }

  resetList() {
    this.items = ['React', 'Angular', 'Vue', 'Svelte'];
    SortPipe.executionCount = 0;
    ImpureSortPipe.executionCount = 0;
  }
}
