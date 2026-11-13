import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationItem } from '../../core/models/notification.model';

@Component({
  selector: 'app-notification-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-dropdown.component.html',
  styleUrl: './notification-dropdown.component.css'
})
export class NotificationDropdownComponent implements OnInit {
  auth = inject(AuthService);
  private notifService = inject(NotificationService);

  isOpen = signal(false);
  notifications = signal<NotificationItem[]>([]);

  unreadCount = computed(() => this.notifications().filter(n => !n.read && !n.isRead).length);

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.loadNotifications();
    }
  }

  toggleOpen(): void {
    this.isOpen.set(!this.isOpen());
    if (this.isOpen()) {
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    this.notifService.loadNotifications().subscribe((data: NotificationItem[]) => {
      this.notifications.set(data);
    });
  }

  markAsRead(id: number): void {
    this.notifService.markAsRead(id).subscribe(() => {
      this.notifications.update(list => 
        list.map(n => n.id === id ? { ...n, read: true, isRead: true } : n)
      );
    });
  }

  markAllAsRead(): void {
    this.notifService.markAllAsRead().subscribe(() => {
      this.notifications.update(list => 
        list.map(n => ({ ...n, read: true, isRead: true }))
      );
    });
  }
}
