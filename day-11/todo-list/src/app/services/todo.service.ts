import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  Category,
  CreateTodoDto,
  Priority,
  SortOption,
  StatusFilter,
  SubTask,
  Todo,
  TodoStats,
} from '../models/todo.model';
import { StorageService } from './storage.service';

const PRIORITY_WEIGHT: Record<Priority, number> = {
  urgent: 4,
  high: 3,
  medium: 2,
  low: 1,
};

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly storage = inject(StorageService);

  // Core reactive state signals
  readonly todos = signal<Todo[]>(this.storage.loadTodos());
  readonly searchQuery = signal<string>('');
  readonly statusFilter = signal<StatusFilter>('all');
  readonly categoryFilter = signal<string>('all');
  readonly priorityFilter = signal<string>('all');
  readonly sortBy = signal<SortOption>('dueDate');

  // Static list of categories
  readonly categories: Category[] = ['Work', 'Personal', 'Study', 'Health', 'Finance', 'General'];

  constructor() {
    // Synchronize to localStorage whenever todos signal changes
    effect(() => {
      this.storage.saveTodos(this.todos());
    });
  }

  // Derived filtered & sorted todos list
  readonly filteredTodos = computed(() => {
    const list = this.todos();
    const query = this.searchQuery().trim().toLowerCase();
    const status = this.statusFilter();
    const category = this.categoryFilter();
    const priority = this.priorityFilter();
    const sort = this.sortBy();
    const today = new Date().toISOString().split('T')[0];

    return list
      .filter((item) => {
        // Search query filter
        if (query) {
          const matchTitle = item.title.toLowerCase().includes(query);
          const matchDesc = item.description?.toLowerCase().includes(query) ?? false;
          const matchSubtask = item.subtasks.some((st) => st.title.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchSubtask) {
            return false;
          }
        }

        // Status filter
        if (status === 'active' && item.completed) {
          return false;
        }
        if (status === 'completed' && !item.completed) {
          return false;
        }
        if (status === 'overdue') {
          if (item.completed || !item.dueDate || item.dueDate >= today) {
            return false;
          }
        }

        // Category filter
        if (category !== 'all' && item.category !== category) {
          return false;
        }

        // Priority filter
        if (priority !== 'all' && item.priority !== priority) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Keep completed items pushed towards the bottom if sorting by dueDate or priority
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }

        switch (sort) {
          case 'dueDate': {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate.localeCompare(b.dueDate);
          }
          case 'priority': {
            return PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority];
          }
          case 'createdAt': {
            return b.createdAt.localeCompare(a.createdAt);
          }
          case 'alphabetical': {
            return a.title.localeCompare(b.title);
          }
          default:
            return 0;
        }
      });
  });

  // Aggregate statistics
  readonly stats = computed<TodoStats>(() => {
    const list = this.todos();
    const total = list.length;
    const completed = list.filter((t) => t.completed).length;
    const active = total - completed;
    const today = new Date().toISOString().split('T')[0];
    const overdue = list.filter((t) => !t.completed && t.dueDate && t.dueDate < today).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    const highPriorityCount = list.filter(
      (t) => !t.completed && (t.priority === 'high' || t.priority === 'urgent')
    ).length;

    return {
      total,
      active,
      completed,
      overdue,
      completionRate,
      highPriorityCount,
    };
  });

  // State Mutations
  addTodo(dto: CreateTodoDto): void {
    const newSubtasks: SubTask[] = (dto.subtasks || [])
      .map((title) => title.trim())
      .filter(Boolean)
      .map((title) => ({
        id: 'sub-' + Math.random().toString(36).substring(2, 9),
        title,
        completed: false,
      }));

    const newTodo: Todo = {
      id: 'todo-' + Math.random().toString(36).substring(2, 9),
      title: dto.title.trim(),
      description: dto.description?.trim() || undefined,
      completed: false,
      priority: dto.priority || 'medium',
      category: dto.category || 'General',
      dueDate: dto.dueDate || undefined,
      subtasks: newSubtasks,
      createdAt: new Date().toISOString(),
    };

    this.todos.update((current) => [newTodo, ...current]);
  }

  toggleTodo(id: string): void {
    this.todos.update((current) =>
      current.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          return {
            ...item,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return item;
      })
    );
  }

  updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>): void {
    this.todos.update((current) =>
      current.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
  }

  deleteTodo(id: string): void {
    this.todos.update((current) => current.filter((item) => item.id !== id));
  }

  toggleSubtask(todoId: string, subtaskId: string): void {
    this.todos.update((current) =>
      current.map((todo) => {
        if (todo.id === todoId) {
          const updatedSubtasks = todo.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          );
          // If all subtasks completed, option to mark todo completed
          const allCompleted = updatedSubtasks.length > 0 && updatedSubtasks.every((st) => st.completed);
          return {
            ...todo,
            subtasks: updatedSubtasks,
            completed: allCompleted ? true : todo.completed,
            completedAt: allCompleted ? new Date().toISOString() : todo.completedAt,
          };
        }
        return todo;
      })
    );
  }

  addSubtask(todoId: string, title: string): void {
    const trimmed = title.trim();
    if (!trimmed) return;

    this.todos.update((current) =>
      current.map((todo) => {
        if (todo.id === todoId) {
          const newSub: SubTask = {
            id: 'sub-' + Math.random().toString(36).substring(2, 9),
            title: trimmed,
            completed: false,
          };
          return {
            ...todo,
            subtasks: [...todo.subtasks, newSub],
            completed: false, // Adding uncompleted subtask resets full completion
          };
        }
        return todo;
      })
    );
  }

  deleteSubtask(todoId: string, subtaskId: string): void {
    this.todos.update((current) =>
      current.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            subtasks: todo.subtasks.filter((st) => st.id !== subtaskId),
          };
        }
        return todo;
      })
    );
  }

  markAllCompleted(): void {
    this.todos.update((current) =>
      current.map((item) => ({
        ...item,
        completed: true,
        completedAt: item.completedAt || new Date().toISOString(),
        subtasks: item.subtasks.map((st) => ({ ...st, completed: true })),
      }))
    );
  }

  clearCompleted(): void {
    this.todos.update((current) => current.filter((item) => !item.completed));
  }

  resetToDemo(): void {
    this.todos.set(this.storage.getSeedTodos());
  }

  exportData(): void {
    this.storage.exportAsJson(this.todos());
  }

  importData(imported: Todo[]): void {
    if (Array.isArray(imported)) {
      this.todos.set(imported);
    }
  }

  // Filter setters
  setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  setStatus(status: StatusFilter): void {
    this.statusFilter.set(status);
  }

  setCategory(category: string): void {
    this.categoryFilter.set(category);
  }

  setPriority(priority: string): void {
    this.priorityFilter.set(priority);
  }

  setSort(sort: SortOption): void {
    this.sortBy.set(sort);
  }
}
