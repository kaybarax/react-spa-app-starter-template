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

export type Severity = 'low' | 'medium' | 'high' | 'critical';

export const SEVERITY_LABELS: Record<Severity, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export interface NotificationAlert {
  alert?: boolean;
  message?: string | null;
  type?: NotificationType;
  duration?: number;
  position?: 'top' | 'bottom';
  severity?: Severity;
}

/**
 * Normalizes a raw notification-type input into a canonical value.
 * Maps 'err'|'error'|'failure'|'fail' -> 'error', etc.
 */
export function normalizeNotificationType(
  input: NotificationType,
): Exclude<NotificationType, 'err' | 'failure' | 'fail' | 'succ' | 'warn' | 'warning' | 'information'> {
  if (input === 'err' || input === 'error' || input === 'failure' || input === 'fail') {
    return 'error';
  }
  if (input === 'succ' || input === 'success') {
    return 'success';
  }
  if (input === 'warn' || input === 'warning') {
    return 'warning';
  }
  return 'info';
}

/**
 * Builds a deduplication key from a notification's type, message, and severity.
 */
export function buildNotificationKey(
  type: NotificationType,
  message: string | null | undefined,
  severity?: Severity,
): string {
  const normalizedType = normalizeNotificationType(type);
  return `${normalizedType}::${message ?? ''}::${severity ?? 'none'}`;
}
