/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
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

export interface NotificationAlert {
  alert?: boolean;
  message?: string | null;
  type?: NotificationType;
  duration?: number;
  position?: 'top' | 'bottom';
}
