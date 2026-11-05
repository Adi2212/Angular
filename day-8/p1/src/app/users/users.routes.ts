import { CanDeactivateFn, Routes } from '@angular/router';

import { TasksComponent, resolveUserTasks } from '../tasks/tasks.component';
import { type NewTaskComponent } from '../tasks/new-task/new-task.component';

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.submitted) {
    return true;
  }
  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose the entered data.'
    );
  }
  return true;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    loadComponent: () =>
      import('../tasks/new-task/new-task.component').then(
        (mod) => mod.NewTaskComponent
      ),
    canDeactivate: [canLeaveEditPage],
  },
];
