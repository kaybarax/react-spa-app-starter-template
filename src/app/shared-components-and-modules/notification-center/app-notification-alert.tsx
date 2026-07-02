/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { useNotificationStore } from './notifications-controller';
import { SEVERITY_LABELS, Severity } from './notification-utils';

const NOTIFICATION_COLOR_CLASSES: Record<string, string> = {
  error: 'is-danger',
  success: 'is-success',
  warning: 'is-warning',
  info: 'is-info',
};

const SEVERITY_COLOR_CLASSES: Record<Severity, string> = {
  low: 'is-light',
  medium: 'is-warning',
  high: 'is-danger',
  critical: 'is-dark',
};

/**
 * Safely renders a message string, falling back to a default when the
 * value is null, undefined, or empty.
 */
function safeMessage(message: string | null | undefined): string {
  if (message === null || message === undefined || message.trim() === '') {
    return 'No message provided';
  }
  return message;
}

/**
 * Renders the global notification alert as a Bulma notification.
 * Mount once at the app entry; trigger via notificationCallback.
 * Handles severity badges and safe empty/missing message rendering.
 */
export default function AppNotificationAlert() {
  const { alert, message, type, severity, position, dismiss } = useNotificationStore();

  if (!alert) return null;

  const colorClass = NOTIFICATION_COLOR_CLASSES[type as keyof typeof NOTIFICATION_COLOR_CLASSES] ?? 'is-info';
  const severityClass = severity ? SEVERITY_COLOR_CLASSES[severity] ?? '' : '';

  return (
    <div className={`app-notification ${position === 'bottom' ? 'app-notification-bottom' : 'app-notification-top'}`}>
      <div className={`notification ${colorClass} ${severityClass}`.trim()} role="alert">
        <button className="delete" aria-label="dismiss notification" onClick={dismiss}></button>
        {severity && (
          <span className={`tag ${SEVERITY_COLOR_CLASSES[severity] ?? ''} is-rounded mr-2`}>
            {SEVERITY_LABELS[severity] ?? severity}
          </span>
        )}
        <span>{safeMessage(message)}</span>
      </div>
    </div>
  );
}
