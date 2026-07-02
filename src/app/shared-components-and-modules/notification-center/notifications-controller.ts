/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { create } from 'zustand';
import {
  NotificationAlert,
  NotificationFilter,
  NotificationItem,
  NotificationSeverity,
  NotificationType,
} from './notification-utils';

export const notificationAlertProps: NotificationAlert = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
};

let nextId = 1;
function generateId(): string {
  return `notification-${nextId++}-${Date.now()}`;
}

export interface NotificationState extends NotificationAlert {
  dismiss: () => void;
  /** Multi-notification center fields */
  notifications: NotificationItem[];
  filter: NotificationFilter;
  grouped: boolean;
  addNotification: (
    message: string,
    severity: NotificationSeverity,
    options?: { duration?: number; position?: 'top' | 'bottom' },
  ) => string;
  dismissAll: () => void;
  dismissBySeverity: (severity: NotificationSeverity) => void;
  markRead: (id: string) => void;
  setFilter: (filter: NotificationFilter) => void;
  setGrouped: (grouped: boolean) => void;
}

/**
 * Global notification store. Any view or controller can trigger a
 * notification through notificationCallback below; the single
 * AppNotificationAlert component mounted at the app entry renders it.
 *
 * The store also supports a multi-notification center with grouping
 * by severity, unread/all filtering, and bulk dismiss.
 */
export const useNotificationStore = create<NotificationState>((set, get) => ({
  ...notificationAlertProps,
  dismiss: () => set({ alert: false, message: null }),
  notifications: [],
  filter: 'all',
  grouped: false,
  addNotification: (message, severity, options) => {
    const id = generateId();
    const item: NotificationItem = {
      id,
      message,
      severity,
      read: false,
      timestamp: Date.now(),
      duration: options?.duration ?? 5000,
      position: options?.position ?? 'top',
    };
    set(state => ({ notifications: [...state.notifications, item] }));
    return id;
  },
  dismissAll: () => set({ notifications: [] }),
  dismissBySeverity: severity =>
    set(state => ({
      notifications: state.notifications.filter(n => n.severity !== severity),
    })),
  markRead: id =>
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),
  setFilter: filter => set({ filter }),
  setGrouped: grouped => set({ grouped }),
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
