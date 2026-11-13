export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  read?: boolean;
  createdAt: string;
}
