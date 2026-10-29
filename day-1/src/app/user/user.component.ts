import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user.model';
import { DUMMY_USERS } from '../dummy-data';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  /**
   * Local user array storing user objects with id, name, and avatar.
   */
  @Input() users: User[] = DUMMY_USERS;

  /**
   * Currently selected user ID for visual active highlighting.
   */
  @Input() selectedUserId?: string;

  /**
   * Event emitted when a user is clicked/selected.
   */
  @Output() selectUser = new EventEmitter<User>();

  onSelect(user: User) {
    this.selectUser.emit(user);
  }
}
