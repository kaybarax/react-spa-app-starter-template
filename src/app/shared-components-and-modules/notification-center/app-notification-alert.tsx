/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { useNotificationStore } from './notifications-controller';

const NOTIFICATION_COLOR_CLASSES = {
  error: 'is-danger',
  success: 'is-success',
  warning: 'is-warning',
  info: 'is-info',
} as const;

/**
 * Renders the global notification alert as a Bulma notification.
 * Mount once at the app entry; trigger via notificationCallback.
 */
export default function AppNotificationAlert() {
  const { alert, message, type, position, dismiss } = useNotificationStore();

  if (!alert) return null;

  const colorClass = NOTIFICATION_COLOR_CLASSES[type as keyof typeof NOTIFICATION_COLOR_CLASSES] ?? 'is-info';

  return (
    <div className={`app-notification ${position === 'bottom' ? 'app-notification-bottom' : 'app-notification-top'}`}>
      <div className={`notification ${colorClass}`} role="alert">
        <button className="delete" aria-label="dismiss notification" onClick={dismiss}></button>
        {message}
      </div>
    </div>
  );
}
