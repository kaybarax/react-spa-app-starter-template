/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { create } from 'zustand';
import {
  NotificationAlert,
  NotificationType,
  Severity,
  normalizeNotificationType,
  buildNotificationKey,
} from './notification-utils';

export const notificationAlertProps: NotificationAlert = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
};

export interface NotificationState extends NotificationAlert {
  severity?: Severity;
  notificationKey?: string;
  dismiss: () => void;
  clear: () => void;
}

/**
 * Global notification store. Any view or controller can trigger a
 * notification through notificationCallback below; the single
 * AppNotificationAlert component mounted at the app entry renders it.
 */
export const useNotificationStore = create<NotificationState>(set => ({
  ...notificationAlertProps,
  severity: undefined,
  notificationKey: undefined,
  dismiss: () => set({ alert: false, message: null, severity: undefined, notificationKey: undefined }),
  clear: () => set({ alert: false, message: null, type: null, severity: undefined, notificationKey: undefined }),
}));

let dismissTimer: number | undefined;

/**
 * Dismisses the current notification and clears the dismiss timer.
 * Used internally and can be called directly for explicit dismissal.
 */
export function dismissNotification(): void {
  window.clearTimeout(dismissTimer);
  dismissTimer = undefined;
  useNotificationStore.getState().dismiss();
}

/**
 * Clears all notification state immediately.
 */
export function clearNotifications(): void {
  window.clearTimeout(dismissTimer);
  dismissTimer = undefined;
  useNotificationStore.getState().clear();
}

export function notificationCallback(
  notificationType: NotificationType,
  message: string,
  position: 'top' | 'bottom' = 'top',
  duration = 3500,
  severity?: Severity,
): void {
  const typeOfNotification = normalizeNotificationType(notificationType);
  const safeMessage = message || 'You have not specified a message';
  const key = buildNotificationKey(typeOfNotification, safeMessage, severity);

  const currentState = useNotificationStore.getState();

  // Deduplication: if the same notification is already showing, reset its timer instead of re-triggering
  if (currentState.alert && currentState.notificationKey === key) {
    window.clearTimeout(dismissTimer);
    dismissTimer = window.setTimeout(() => useNotificationStore.getState().dismiss(), duration);
    return;
  }

  useNotificationStore.setState({
    alert: true,
    type: typeOfNotification,
    message: safeMessage,
    position,
    duration,
    severity,
    notificationKey: key,
  });

  window.clearTimeout(dismissTimer);
  dismissTimer = window.setTimeout(() => useNotificationStore.getState().dismiss(), duration);
}
