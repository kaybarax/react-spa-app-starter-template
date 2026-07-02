/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { useNotificationStore } from './notifications-controller';
import type { NotificationSeverity } from './notification-utils';

const NOTIFICATION_COLOR_CLASSES: Record<string, string> = {
  error: 'is-danger',
  success: 'is-success',
  warning: 'is-warning',
  info: 'is-info',
  critical: 'is-danger',
};

const SEVERITY_LABELS: Record<NotificationSeverity, string> = {
  critical: 'Critical',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
};

const SEVERITY_ORDER: NotificationSeverity[] = ['critical', 'error', 'warning', 'info'];

/**
 * Renders the global notification alert as a Bulma notification,
 * plus the notification center with grouping, filtering, and bulk dismiss.
 * Mount once at the app entry; trigger via notificationCallback or addNotification.
 */
export default function AppNotificationAlert() {
  const {
    alert,
    message,
    type,
    position,
    dismiss,
    notifications,
    filter,
    grouped,
    dismissAll,
    dismissBySeverity,
    markRead,
    setFilter,
    setGrouped,
  } = useNotificationStore();

  const hasNotifications = notifications.length > 0;

  // Apply unread filter
  const filteredNotifications =
    filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  // Group by severity when enabled
  const groupedNotifications = grouped
    ? SEVERITY_ORDER.map(severity => ({
        severity,
        items: filteredNotifications.filter(n => n.severity === severity),
      })).filter(g => g.items.length > 0)
    : [];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Legacy single toast notification */}
      {alert && (
        <div
          className={`app-notification ${position === 'bottom' ? 'app-notification-bottom' : 'app-notification-top'}`}
        >
          <div
            className={`notification ${NOTIFICATION_COLOR_CLASSES[type as string] ?? 'is-info'}`}
            role="alert"
          >
            <button
              className="delete"
              aria-label="dismiss notification"
              onClick={dismiss}
            ></button>
            {message}
          </div>
        </div>
      )}

      {/* Notification center */}
      {hasNotifications && (
        <div className="app-notification-center box" role="region" aria-label="Notification center">
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <strong>Notifications</strong>
                {unreadCount > 0 && (
                  <span className="tag is-info is-light ml-1" data-testid="unread-count">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <button
                  className="button is-small is-text"
                  onClick={dismissAll}
                  aria-label="Dismiss all notifications"
                  data-testid="dismiss-all"
                >
                  Dismiss all
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="field is-grouped is-grouped-multiline mb-2">
            <div className="control">
              <div className="buttons has-addons are-small">
                <button
                  className={`button ${filter === 'all' ? 'is-info is-selected' : ''}`}
                  onClick={() => setFilter('all')}
                  data-testid="filter-all"
                >
                  All
                </button>
                <button
                  className={`button ${filter === 'unread' ? 'is-info is-selected' : ''}`}
                  onClick={() => setFilter('unread')}
                  data-testid="filter-unread"
                >
                  Unread
                </button>
              </div>
            </div>
            <div className="control">
              <button
                className={`button is-small ${grouped ? 'is-link' : ''}`}
                onClick={() => setGrouped(!grouped)}
                data-testid="toggle-group"
              >
                {grouped ? 'Ungroup' : 'Group by severity'}
              </button>
            </div>
          </div>

          {/* Notifications list */}
          {grouped ? (
            // Grouped view
            groupedNotifications.map(group => (
              <div key={group.severity} className="mb-2" data-testid={`group-${group.severity}`}>
                <div className="level is-mobile">
                  <div className="level-left">
                    <div className="level-item">
                      <strong>{SEVERITY_LABELS[group.severity]}</strong>
                      <span className="tag is-light ml-1">{group.items.length}</span>
                    </div>
                  </div>
                  <div className="level-right">
                    <div className="level-item">
                      <button
                        className="button is-small is-text"
                        onClick={() => dismissBySeverity(group.severity)}
                        data-testid={`dismiss-severity-${group.severity}`}
                      >
                        Dismiss all
                      </button>
                    </div>
                  </div>
                </div>
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className={`notification is-light ${NOTIFICATION_COLOR_CLASSES[item.severity] ?? ''} mb-1`}
                    data-testid={`notification-item-${item.id}`}
                    role={item.read ? 'status' : 'alert'}
                  >
                    <button
                      className="delete"
                      aria-label={`Dismiss ${item.severity} notification`}
                      onClick={() => dismissBySeverity(item.severity)}
                    ></button>
                    {!item.read && (
                      <button
                        className="button is-small is-text is-pulled-right"
                        onClick={() => markRead(item.id)}
                        data-testid={`mark-read-${item.id}`}
                      >
                        Mark read
                      </button>
                    )}
                    <span className={`tag ${NOTIFICATION_COLOR_CLASSES[item.severity] ?? ''} mr-1`}>
                      {SEVERITY_LABELS[item.severity]}
                    </span>
                    {item.message}
                  </div>
                ))}
              </div>
            ))
          ) : (
            // Flat list view
            filteredNotifications.map(item => (
              <div
                key={item.id}
                className={`notification is-light ${NOTIFICATION_COLOR_CLASSES[item.severity] ?? ''} mb-1`}
                data-testid={`notification-item-${item.id}`}
                role={item.read ? 'status' : 'alert'}
              >
                <button
                  className="delete"
                  aria-label={`Dismiss ${item.severity} notification`}
                  onClick={() => dismissBySeverity(item.severity)}
                ></button>
                {!item.read && (
                  <button
                    className="button is-small is-text is-pulled-right"
                    onClick={() => markRead(item.id)}
                    data-testid={`mark-read-${item.id}`}
                  >
                    Mark read
                  </button>
                )}
                <span
                  className={`tag ${NOTIFICATION_COLOR_CLASSES[item.severity] ?? ''} mr-1`}
                >
                  {SEVERITY_LABELS[item.severity]}
                </span>
                {item.message}
              </div>
            ))
          )}

          {filteredNotifications.length === 0 && (
            <p className="has-text-grey has-text-centered" data-testid="no-notifications">
              No notifications
            </p>
          )}
        </div>
      )}
    </>
  );
}
