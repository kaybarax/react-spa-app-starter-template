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

/**
 * Canonical severity levels for grouping and filtering.
 */
export type Severity = 'error' | 'warning' | 'info' | 'success';

/**
 * A single notification entry in the notification-centre list.
 */
export interface NotificationEntry {
  id: string;
  severity: Severity;
  message: string;
  read: boolean;
  timestamp: number;
  position?: 'top' | 'bottom';
}

/**
 * Maps any NotificationType alias to its canonical Severity.
 */
export function typeToSeverity(type: NotificationType): Severity {
  if (type === 'err' || type === 'error' || type === 'failure' || type === 'fail') return 'error';
  if (type === 'succ' || type === 'success') return 'success';
  if (type === 'warn' || type === 'warning') return 'warning';
  return 'info';
}
