/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { create } from 'zustand';
import { NotificationAlert, NotificationType, Severity, NotificationEntry, typeToSeverity } from './notification-utils';

export const notificationAlertProps: NotificationAlert = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
};

export interface NotificationState extends NotificationAlert {
  dismiss: () => void;
}

/**
 * Global notification store. Any view or controller can trigger a
 * notification through notificationCallback below; the single
 * AppNotificationAlert component mounted at the app entry renders it.
 */
export const useNotificationStore = create<NotificationState>(set => ({
  ...notificationAlertProps,
  dismiss: () => set({ alert: false, message: null }),
}));

let dismissTimer: number | undefined;

export function notificationCallback(
  notificationType: NotificationType,
  message: string,
  position: 'top' | 'bottom' = 'top',
  duration = 3500,
): void {
  let typeOfNotification: NotificationType = 'info'; //default to this

  if (
    notificationType === 'err' ||
    notificationType === 'error' ||
    notificationType === 'failure' ||
    notificationType === 'fail'
  ) {
    typeOfNotification = 'error';
  }
  if (notificationType === 'succ' || notificationType === 'success') {
    typeOfNotification = 'success';
  }
  if (notificationType === 'warn' || notificationType === 'warning') {
    typeOfNotification = 'warning';
  }

  useNotificationStore.setState({
    alert: true,
    type: typeOfNotification,
    message: message || 'You have not specified a message',
    position,
    duration,
  });

  window.clearTimeout(dismissTimer);
  dismissTimer = window.setTimeout(() => useNotificationStore.getState().dismiss(), duration);
}

// ---------------------------------------------------------------------------
// Notification Centre — multi-notification store with grouping, filtering,
// and bulk dismiss.  Keeps the singleton toast above for backward compat.
// ---------------------------------------------------------------------------

let nextId = 1;
function generateId(): string {
  return `ntf-${Date.now()}-${nextId++}`;
}

export type ReadFilter = 'all' | 'read' | 'unread';

export interface NotificationCenterFilters {
  severity: Severity | 'all';
  readStatus: ReadFilter;
}

export interface NotificationCenterState {
  notifications: NotificationEntry[];
  filters: NotificationCenterFilters;
  addNotification: (severity: Severity, message: string, position?: 'top' | 'bottom') => string;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  dismissBySeverity: (severity: Severity) => void;
  dismissAll: () => void;
  setFilterSeverity: (severity: Severity | 'all') => void;
  setFilterReadStatus: (status: ReadFilter) => void;
}

/**
 * Zustand store that holds the history of all notifications (not just the
 * current singleton toast). Supports grouping, filtering, bulk dismiss.
 */
export const useNotificationCenterStore = create<NotificationCenterState>(set => ({
  notifications: [],
  filters: { severity: 'all' as const, readStatus: 'all' as const },

  addNotification: (severity, message, position = 'top') => {
    const id = generateId();
    set(state => ({
      notifications: [
        ...state.notifications,
        { id, severity, message, read: false, timestamp: Date.now(), position },
      ],
    }));
    return id;
  },

  markRead: id =>
    set(state => ({
      notifications: state.notifications.map(n => (n.id === id ? { ...n, read: true } : n)),
    })),

  markAllRead: () =>
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
    })),

  dismiss: id =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    })),

  dismissBySeverity: severity =>
    set(state => ({
      notifications: state.notifications.filter(n => n.severity !== severity),
    })),

  dismissAll: () => set({ notifications: [] }),

  setFilterSeverity: severity =>
    set(state => ({
      filters: { ...state.filters, severity },
    })),

  setFilterReadStatus: readStatus =>
    set(state => ({
      filters: { ...state.filters, readStatus },
    })),
}));

/**
 * Add a notification to the centre and simultaneously show the singleton
 * toast for immediate visibility.  Returns the new notification's id.
 */
export function notificationCenterCallback(
  notificationType: NotificationType,
  message: string,
  position: 'top' | 'bottom' = 'top',
  duration = 3500,
): string {
  const severity = typeToSeverity(notificationType);
  const id = useNotificationCenterStore.getState().addNotification(severity, message, position);
  notificationCallback(notificationType, message, position, duration);
  return id;
}

// ---------------------------------------------------------------------------
// Pure helpers (no store coupling) — easy to test & compose.
// ---------------------------------------------------------------------------

/**
 * Group an array of notification entries by severity.
 * Always returns all four severity keys.
 */
export function groupBySeverity(notifications: NotificationEntry[]): Record<Severity, NotificationEntry[]> {
  const groups: Record<Severity, NotificationEntry[]> = {
    error: [],
    warning: [],
    info: [],
    success: [],
  };
  for (const n of notifications) {
    groups[n.severity].push(n);
  }
  return groups;
}

/**
 * Filter notification entries based on the provided filter settings.
 */
export function filterNotifications(
  notifications: NotificationEntry[],
  filters: NotificationCenterFilters,
): NotificationEntry[] {
  let filtered = notifications;
  if (filters.severity !== 'all') {
    filtered = filtered.filter(n => n.severity === filters.severity);
  }
  if (filters.readStatus === 'read') {
    filtered = filtered.filter(n => n.read);
  } else if (filters.readStatus === 'unread') {
    filtered = filtered.filter(n => !n.read);
  }
  return filtered;
}
