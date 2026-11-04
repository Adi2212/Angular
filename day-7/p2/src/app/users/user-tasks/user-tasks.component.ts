import { Component, computed, inject, input } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

import { UsersService } from '../users.service';

export const resolveUserName: ResolveFn<string> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const user = usersService.users.find(
    (u) => u.id === activatedRouteSnapshot.paramMap.get('userId')
  );
  return user ? user.name : 'User';
};

export const resolveTitle: ResolveFn<string> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRouteSnapshot, routerState) + "'s Tasks";
};

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  userId = input.required<string>();
  userName = input<string>();
  private usersService = inject(UsersService);

  displayName = computed(() => {
    if (this.userName()) {
      return this.userName()!;
    }
    return (
      this.usersService.users.find((u) => u.id === this.userId())?.name ??
      'User'
    );
  });
}
