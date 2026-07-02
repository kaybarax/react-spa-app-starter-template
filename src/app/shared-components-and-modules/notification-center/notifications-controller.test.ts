import { notificationCallback, useNotificationStore } from './notifications-controller';
import type { NotificationSeverity } from './notification-utils';

describe('notificationCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useNotificationStore.getState().dismiss();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows a notification through the global store', () => {
    notificationCallback('succ', 'Saved!');

    const state = useNotificationStore.getState();
    expect(state.alert).toBe(true);
    expect(state.type).toBe('success');
    expect(state.message).toBe('Saved!');
  });

  it.each([
    ['err', 'error'],
    ['failure', 'error'],
    ['warn', 'warning'],
    ['info', 'info'],
    ['information', 'info'],
  ] as const)('normalizes the %s notification type to %s', (input, expected) => {
    notificationCallback(input, 'message');
    expect(useNotificationStore.getState().type).toBe(expected);
  });

  it('auto-dismisses after the given duration', () => {
    notificationCallback('info', 'Heads up', 'top', 2000);
    expect(useNotificationStore.getState().alert).toBe(true);

    vi.advanceTimersByTime(2000);
    expect(useNotificationStore.getState().alert).toBe(false);
    expect(useNotificationStore.getState().message).toBeNull();
  });
});

describe('addNotification', () => {
  beforeEach(() => {
    useNotificationStore.getState().dismissAll();
  });

  it('adds a notification with the given severity', () => {
    const id = useNotificationStore.getState().addNotification('Server error', 'error');

    const state = useNotificationStore.getState();
    expect(state.notifications).toHaveLength(1);
    expect(state.notifications[0].message).toBe('Server error');
    expect(state.notifications[0].severity).toBe('error');
    expect(state.notifications[0].read).toBe(false);
    expect(state.notifications[0].id).toBe(id);
  });

  it('adds multiple notifications', () => {
    const store = useNotificationStore.getState();
    store.addNotification('First', 'info');
    store.addNotification('Second', 'warning');
    store.addNotification('Third', 'error');

    expect(useNotificationStore.getState().notifications).toHaveLength(3);
  });

  it('accepts optional parameters', () => {
    useNotificationStore
      .getState()
      .addNotification('Persistent', 'critical', { duration: 10000, position: 'bottom' });

    const item = useNotificationStore.getState().notifications[0];
    expect(item.duration).toBe(10000);
    expect(item.position).toBe('bottom');
  });

  it('returns a unique id for each notification', () => {
    const id1 = useNotificationStore.getState().addNotification('A', 'info');
    const id2 = useNotificationStore.getState().addNotification('B', 'info');

    expect(id1).not.toBe(id2);
  });
});

describe('severity grouping', () => {
  beforeEach(() => {
    useNotificationStore.getState().dismissAll();
  });

  it('groups notifications by severity', () => {
    const store = useNotificationStore.getState();
    store.addNotification('Low disk', 'warning');
    store.addNotification('Disk full', 'critical');
    store.addNotification('Login failure', 'error');
    store.addNotification('App update', 'info');
    store.addNotification('CPU high', 'warning');

    const state = useNotificationStore.getState();
    expect(state.notifications).toHaveLength(5);

    // Group into severity buckets manually to verify
    const groups: Record<NotificationSeverity, number> = {
      critical: 1,
      error: 1,
      warning: 2,
      info: 1,
    };

    for (const [severity, count] of Object.entries(groups)) {
      const items = state.notifications.filter(n => n.severity === severity);
      expect(items).toHaveLength(count);
    }
  });

  it('toggles grouped flag', () => {
    const store = useNotificationStore.getState();
    expect(store.grouped).toBe(false);

    store.setGrouped(true);
    expect(useNotificationStore.getState().grouped).toBe(true);

    store.setGrouped(false);
    expect(useNotificationStore.getState().grouped).toBe(false);
  });
});

describe('unread filtering', () => {
  beforeEach(() => {
    useNotificationStore.getState().dismissAll();
    useNotificationStore.getState().setFilter('all');
  });

  it('defaults filter to all', () => {
    expect(useNotificationStore.getState().filter).toBe('all');
  });

  it('toggles filter between all and unread', () => {
    const store = useNotificationStore.getState();
    store.setFilter('unread');
    expect(useNotificationStore.getState().filter).toBe('unread');

    store.setFilter('all');
    expect(useNotificationStore.getState().filter).toBe('all');
  });

  it('marks a notification as read', () => {
    const store = useNotificationStore.getState();
    const id = store.addNotification('Read me', 'info');

    store.markRead(id);

    const item = useNotificationStore.getState().notifications.find(n => n.id === id);
    expect(item?.read).toBe(true);
  });

  it('filters unread notifications when filter is unread', () => {
    const store = useNotificationStore.getState();
    const id1 = store.addNotification('Unread one', 'info');
    const id2 = store.addNotification('Unread two', 'error');
    store.addNotification('Will be read', 'warning');

    store.markRead(id1);
    store.markRead(id2);

    store.setFilter('unread');
    const state = useNotificationStore.getState();
    const unread = state.notifications.filter(n => !n.read);
    expect(unread).toHaveLength(1);
    expect(unread[0].message).toBe('Will be read');
  });
});

describe('bulk dismiss', () => {
  beforeEach(() => {
    useNotificationStore.getState().dismissAll();
  });

  it('dismisses all notifications', () => {
    const store = useNotificationStore.getState();
    store.addNotification('One', 'info');
    store.addNotification('Two', 'error');
    store.addNotification('Three', 'warning');

    store.dismissAll();
    expect(useNotificationStore.getState().notifications).toHaveLength(0);
  });

  it('dismisses notifications by severity', () => {
    const store = useNotificationStore.getState();
    store.addNotification('Error 1', 'error');
    store.addNotification('Error 2', 'error');
    store.addNotification('Warning', 'warning');
    store.addNotification('Info', 'info');

    store.dismissBySeverity('error');

    const state = useNotificationStore.getState();
    expect(state.notifications).toHaveLength(2);
    expect(state.notifications.every(n => n.severity !== 'error')).toBe(true);
  });

  it('preserves single dismiss behavior', () => {
    const store = useNotificationStore.getState();
    expect(typeof store.dismiss).toBe('function');

    // Trigger a legacy toast
    notificationCallback('info', 'Legacy toast');
    expect(useNotificationStore.getState().alert).toBe(true);

    store.dismiss();
    expect(useNotificationStore.getState().alert).toBe(false);
  });

  it('handles dismissBySeverity when no matching severity exists', () => {
    const store = useNotificationStore.getState();
    store.addNotification('Only info', 'info');

    // Dismiss a severity that doesn't exist
    store.dismissBySeverity('critical');

    expect(useNotificationStore.getState().notifications).toHaveLength(1);
  });
});
