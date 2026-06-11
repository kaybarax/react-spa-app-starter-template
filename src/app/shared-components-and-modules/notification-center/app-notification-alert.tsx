/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
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
