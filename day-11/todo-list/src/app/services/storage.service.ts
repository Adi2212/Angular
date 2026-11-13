import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

const STORAGE_KEY = 'day11_todo_list_data';

export const INITIAL_TODOS: Todo[] = [
  {
    id: 'todo-1',
    title: 'Complete Angular 21 Architecture Review',
    description: 'Verify signals, standalone components, OnPush change detection, and native control flow.',
    completed: false,
    priority: 'urgent',
    category: 'Work',
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    subtasks: [
      { id: 'sub-1', title: 'Verify signal inputs and outputs', completed: true },
      { id: 'sub-2', title: 'Check WCAG AA accessibility', completed: false },
      { id: 'sub-3', title: 'Audit bundle size and dev build', completed: false },
    ],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'todo-2',
    title: 'Prepare Weekly Sprint Planning Presentation',
    description: 'Outline key milestones for the Q4 deliverables and team resource allocations.',
    completed: false,
    priority: 'high',
    category: 'Work',
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    subtasks: [
      { id: 'sub-4', title: 'Gather velocity metrics', completed: true },
      { id: 'sub-5', title: 'Draft roadmap slides', completed: false },
    ],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'todo-3',
    title: 'Morning 5km Cardio Run',
    description: 'Outdoor trail run around the neighborhood park to maintain daily fitness goal.',
    completed: true,
    priority: 'medium',
    category: 'Health',
    dueDate: new Date().toISOString().split('T')[0],
    subtasks: [],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'todo-4',
    title: 'Read Chapter 4 of TypeScript Deep Dive',
    description: 'Focus on conditional types, template literal types, and mapped types.',
    completed: false,
    priority: 'low',
    category: 'Study',
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    subtasks: [],
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'todo-5',
    title: 'Review Monthly Cloud Infrastructure Bill',
    description: 'Check AWS/GCP instance utilization and decommission unused idle instances.',
    completed: false,
    priority: 'medium',
    category: 'Finance',
    dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday (overdue demonstration)
    subtasks: [
      { id: 'sub-6', title: 'Download billing CSV report', completed: true },
      { id: 'sub-7', title: 'Audit RDS snapshots', completed: false },
    ],
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  loadTodos(): Todo[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // LocalStorage access failure or invalid JSON, fallback to seed
    }
    return this.getSeedTodos();
  }

  saveTodos(todos: Todo[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Handle storage quota exceeded gracefully
    }
  }

  getSeedTodos(): Todo[] {
    return JSON.parse(JSON.stringify(INITIAL_TODOS));
  }

  clearStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }

  exportAsJson(todos: Todo[]): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(todos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `todo-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
