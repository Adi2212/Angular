export interface Task {
  id: string;
  userId: string;
  title: string;
  summary: string;
  dueDate: string;
}

export interface NewTaskPayload {
  title: string;
  summary: string;
  dueDate: string;
}
