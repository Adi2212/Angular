export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type Category = 'Work' | 'Personal' | 'Study' | 'Health' | 'Finance' | 'General';

export type StatusFilter = 'all' | 'active' | 'completed' | 'overdue';

export type SortOption = 'dueDate' | 'priority' | 'createdAt' | 'alphabetical';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: string; // YYYY-MM-DD
  subtasks: SubTask[];
  createdAt: string; // ISO string
  completedAt?: string; // ISO string
}

export interface CreateTodoDto {
  title: string;
  description?: string;
  priority?: Priority;
  category?: Category;
  dueDate?: string;
  subtasks?: string[];
}

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
  completionRate: number;
  highPriorityCount: number;
}
