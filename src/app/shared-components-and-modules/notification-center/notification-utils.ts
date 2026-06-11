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

export interface NotificationAlert {
  alert?: boolean;
  message?: string | null;
  type?: NotificationType;
  duration?: number;
  position?: 'top' | 'bottom';
}
