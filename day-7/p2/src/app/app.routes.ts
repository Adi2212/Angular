import { inject } from '@angular/core';
import { CanMatchFn, Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  UserTasksComponent,
  resolveTitle,
  resolveUserName,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersService } from './users/users.service';
import { userRoutes } from './users/users.routes';

/**
 * CanMatch guard ensuring only existing user IDs match the route.
 * Non-existent user IDs fall through to the wildcard 404 handler.
 */
export const canMatchUser: CanMatchFn = (route, segments) => {
  const usersService = inject(UsersService);
  const userId = segments[1]?.path;
  return usersService.users.some((u) => u.id === userId);
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'EasyTask - Home',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [canMatchUser],
    title: resolveTitle,
    resolve: {
      userName: resolveUserName,
    },
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    title: '404 - Page Not Found',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: '404 - Page Not Found',
  },
];
