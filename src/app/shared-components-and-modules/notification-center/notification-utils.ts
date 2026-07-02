/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

export type NotificationType =
  | 'err'
  | 'error'
  | 'failure'
  | 'fail'
  | 'succ'
  | 'success'
  | 'warn'
  | 'warning'
  | 'information'
  | 'info'
  | null;

export type NotificationSeverity = 'critical' | 'error' | 'warning' | 'info';

export type NotificationFilter = 'all' | 'unread';

export interface NotificationAlert {
  alert?: boolean;
  message?: string | null;
  type?: NotificationType;
  duration?: number;
  position?: 'top' | 'bottom';
}

export interface NotificationItem {
  id: string;
  message: string;
  severity: NotificationSeverity;
  type?: NotificationType;
  read: boolean;
  timestamp: number;
  duration?: number;
  position?: 'top' | 'bottom';
}
