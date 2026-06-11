/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { create } from 'zustand';
import { NotificationAlert, NotificationType } from './notification-utils';

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
