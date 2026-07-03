/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { useNotificationStore, useNotificationCenterStore, groupBySeverity, filterNotifications } from './notifications-controller';
import type { Severity } from './notification-utils';
import { useState } from 'react';

const NOTIFICATION_COLOR_CLASSES = {
  error: 'is-danger',
  success: 'is-success',
  warning: 'is-warning',
  info: 'is-info',
} as const;

const SEVERITY_LABELS: Record<Severity, string> = {
  error: 'Errors',
  warning: 'Warnings',
  info: 'Info',
  success: 'Success',
};

const SEVERITY_ORDER: Severity[] = ['error', 'warning', 'info', 'success'];

/**
 * Renders the global notification alert as a Bulma notification.
 * Mount once at the app entry; trigger via notificationCallback.
 */
export default function AppNotificationAlert() {
  const { alert, message, type, position, dismiss } = useNotificationStore();
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <>
      {alert && (
        <div className={`app-notification ${position === 'bottom' ? 'app-notification-bottom' : 'app-notification-top'}`}>
          <div className={`notification ${NOTIFICATION_COLOR_CLASSES[type as keyof typeof NOTIFICATION_COLOR_CLASSES] ?? 'is-info'}`} role="alert">
            <button className="delete" aria-label="dismiss notification" onClick={dismiss}></button>
            {message}
          </div>
        </div>
      )}

      {/* Toggle button for the notification centre panel */}
      <button
        className="button is-small is-light app-notification-centre-toggle"
        onClick={() => setPanelOpen(p => !p)}
        aria-label="toggle notification centre"
      >
        {panelOpen ? '✕' : '🔔'}
      </button>

      {panelOpen && <NotificationCentrePanel onClose={() => setPanelOpen(false)} />}
    </>
  );
}

/**
 * Notification centre panel — grouped, filtered, bulk-dismiss.
 */
function NotificationCentrePanel({ onClose }: { onClose: () => void }) {
  const notifications = useNotificationCenterStore(s => s.notifications);
  const filters = useNotificationCenterStore(s => s.filters);
  const markRead = useNotificationCenterStore(s => s.markRead);
  const markAllRead = useNotificationCenterStore(s => s.markAllRead);
  const dismiss = useNotificationCenterStore(s => s.dismiss);
  const dismissBySeverity = useNotificationCenterStore(s => s.dismissBySeverity);
  const dismissAll = useNotificationCenterStore(s => s.dismissAll);
  const setFilterSeverity = useNotificationCenterStore(s => s.setFilterSeverity);
  const setFilterReadStatus = useNotificationCenterStore(s => s.setFilterReadStatus);

  const filtered = filterNotifications(notifications, filters);
  const grouped = groupBySeverity(filtered);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="app-notification-centre">
      {/* Header */}
      <div className="app-notification-centre-header">
        <span className="app-notification-centre-title">
          Notifications {unreadCount > 0 && <span className="tag is-small is-info">{unreadCount}</span>}
        </span>
        <button className="delete is-small" onClick={onClose} aria-label="close notification centre" />
      </div>

      {/* Bulk actions */}
      <div className="app-notification-centre-actions">
        <button className="button is-small is-light" onClick={markAllRead} disabled={unreadCount === 0}>
          Mark all read
        </button>
        <button className="button is-small is-light" onClick={dismissAll} disabled={notifications.length === 0}>
          Dismiss all
        </button>
      </div>

      {/* Filters */}
      <div className="app-notification-centre-filters">
        <div className="field has-addons">
          {(['all', 'error', 'warning', 'info', 'success'] as const).map(s => (
            <p key={s} className="control">
              <button
                className={`button is-small ${filters.severity === s ? 'is-info is-selected' : ''}`}
                onClick={() => setFilterSeverity(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            </p>
          ))}
        </div>
        <div className="field has-addons">
          {(['all', 'unread', 'read'] as const).map(s => (
            <p key={s} className="control">
              <button
                className={`button is-small ${filters.readStatus === s ? 'is-info is-selected' : ''}`}
                onClick={() => setFilterReadStatus(s)}
              >
                {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            </p>
          ))}
        </div>
      </div>

      {/* Grouped list */}
      <div className="app-notification-centre-list">
        {SEVERITY_ORDER.map(sev => {
          const entries = grouped[sev];
          if (entries.length === 0) return null;
          return (
            <div key={sev} className="app-notification-centre-group">
              <div className="app-notification-centre-group-header">
                <span className={`tag ${NOTIFICATION_COLOR_CLASSES[sev]}`}>
                  {SEVERITY_LABELS[sev]} ({entries.length})
                </span>
                <button
                  className="button is-small is-text"
                  onClick={() => dismissBySeverity(sev)}
                >
                  Dismiss {SEVERITY_LABELS[sev].toLowerCase()}
                </button>
              </div>
              {entries.map(n => (
                <div
                  key={n.id}
                  className={`app-notification-centre-item ${n.read ? 'is-read' : 'is-unread'}`}
                >
                  <span className={`tag is-light ${NOTIFICATION_COLOR_CLASSES[n.severity]}`}>
                    {n.severity}
                  </span>
                  <span className="app-notification-centre-item-message">{n.message}</span>
                  <div className="app-notification-centre-item-actions">
                    {!n.read && (
                      <button
                        className="button is-small is-text"
                        onClick={() => markRead(n.id)}
                      >
                        Mark read
                      </button>
                    )}
                    <button
                      className="delete is-small"
                      onClick={() => dismiss(n.id)}
                      aria-label={`dismiss notification ${n.id}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          );
        })}

        {notifications.length === 0 && (
          <p className="has-text-grey-light">No notifications yet.</p>
        )}
      </div>
    </div>
  );
}
