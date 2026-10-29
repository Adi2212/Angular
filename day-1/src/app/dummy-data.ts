import { User } from './models/user.model';
import { Task } from './models/task.model';

export const DUMMY_USERS: User[] = [
  {
    id: 'u1',
    name: 'Jasmine Washington',
    avatar: 'avatars/user-1.svg',
  },
  {
    id: 'u2',
    name: 'Emily Thompson',
    avatar: 'avatars/user-2.svg',
  },
  {
    id: 'u3',
    name: 'Marcus Johnson',
    avatar: 'avatars/user-3.svg',
  },
  {
    id: 'u4',
    name: 'David Miller',
    avatar: 'avatars/user-4.svg',
  },
];

export const DUMMY_TASKS: Task[] = [
  {
    id: 't1',
    userId: 'u1',
    title: 'Master Angular Standalone Components',
    summary:
      'Learn how to build modular and performant applications using modern standalone components and signals in Angular.',
    dueDate: '2026-11-15',
  },
  {
    id: 't2',
    userId: 'u1',
    title: 'Build UI Layout with Sidebar and Header',
    summary:
      'Construct a clean 3-part layout featuring a branded header, responsive sidebar with user list, and main article area.',
    dueDate: '2026-11-20',
  },
  {
    id: 't3',
    userId: 'u2',
    title: 'Prepare Project Presentation',
    summary:
      'Create slide deck covering user management features and task workflow for the engineering team review.',
    dueDate: '2026-11-10',
  },
  {
    id: 't4',
    userId: 'u3',
    title: 'Implement Task Creation Modal',
    summary:
      'Add dialog form popup with validation for title, summary, and due date fields.',
    dueDate: '2026-11-05',
  },
  {
    id: 't5',
    userId: 'u4',
    title: 'Optimize Responsive Design',
    summary:
      'Ensure sidebar collapses gracefully on mobile devices and cards scale smoothly across breakpoints.',
    dueDate: '2026-11-25',
  },
];
