import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepeatDirective } from '../../directives/repeat.directive';
import { CopyClipboardDirective } from '../../directives/copy-clipboard.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';

export interface DirectiveItem {
  id: number;
  title: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
}

@Component({
  selector: 'app-structural-directives',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RepeatDirective,
    CopyClipboardDirective,
    TooltipDirective
  ],
  templateUrl: './structural-directives.component.html',
  styleUrl: './structural-directives.component.css'
})
export class StructuralDirectivesComponent {
  // *ngIf state
  showDetails = true;
  isLoading = false;

  // *ngSwitch state
  selectedPriority: 'low' | 'medium' | 'high' | 'critical' = 'medium';

  // *appRepeat state
  repeatCount = 4;

  // *ngFor collection
  items: DirectiveItem[] = [
    { id: 101, title: 'Learn Custom Attribute Directives', category: 'Directives', status: 'completed' },
    { id: 102, title: 'Master ViewContainerRef & TemplateRef', category: 'Architecture', status: 'in-progress' },
    { id: 103, title: 'Implement Host Directives Composition', category: 'Modern Angular', status: 'pending' },
    { id: 104, title: 'Understand Micro-syntax De-sugaring', category: 'Compiler', status: 'pending' }
  ];

  nextId = 105;
  newItemTitle = '';

  // TrackBy function
  trackByItemId(index: number, item: DirectiveItem): number {
    return item.id;
  }

  addItem() {
    if (!this.newItemTitle.trim()) return;
    this.items.unshift({
      id: this.nextId++,
      title: this.newItemTitle.trim(),
      category: 'Interactive',
      status: 'pending'
    });
    this.newItemTitle = '';
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  toggleStatus(item: DirectiveItem) {
    if (item.status === 'pending') item.status = 'in-progress';
    else if (item.status === 'in-progress') item.status = 'completed';
    else item.status = 'pending';
  }

  ngIfSnippet = `<div *ngIf="showDetails; else emptyTemplate">
  Details Content
</div>
<ng-template #emptyTemplate>
  <p>No details to show.</p>
</ng-template>`;

  ngForSnippet = `<div *ngFor="let item of items; let i = index; let isFirst = first; let isEven = even; trackBy: trackByItemId"
     [class.even-row]="isEven">
  #{{ i + 1 }} {{ item.title }}
</div>`;

  repeatSnippet = `<div *appRepeat="repeatCount; let i = index; let isLast = last">
  Step #{{ i }} ({{ isLast ? 'Final' : 'In Progress' }})
</div>`;
}
