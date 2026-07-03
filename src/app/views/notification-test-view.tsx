import React from 'react';
import { notificationCallback } from '../shared-components-and-modules/notification-center/notifications-controller';

export default function NotificationTestView() {
  const handleClick = () => {
    notificationCallback('success', 'Test notification');
  };
  return (
    <div>
      <h1>Notification Test Page</h1>
      <button id="notify-btn" onClick={handleClick}>Trigger Notification</button>
    </div>
  );
}
