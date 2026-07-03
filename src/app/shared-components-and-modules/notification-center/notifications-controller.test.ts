import { notificationCallback, useNotificationStore } from './notifications-controller';

import {
  useNotificationCenterStore,
  notificationCenterCallback,
  groupBySeverity,
  filterNotifications,
} from './notifications-controller';
import type { Severity, NotificationEntry } from './notification-utils';

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

// ---------------------------------------------------------------------------
// Notification centre tests
// ---------------------------------------------------------------------------

describe('useNotificationCenterStore', () => {
  beforeEach(() => {
    useNotificationCenterStore.getState().dismissAll();
  });

  describe('addNotification', () => {
    it('adds a notification entry with generated id and read=false', () => {
      const id = useNotificationCenterStore.getState().addNotification('error', 'Something broke');
      const { notifications } = useNotificationCenterStore.getState();
      expect(notifications).toHaveLength(1);
      expect(notifications[0]).toMatchObject({
        id,
        severity: 'error',
        message: 'Something broke',
        read: false,
      });
      expect(notifications[0].timestamp).toBeGreaterThan(0);
      expect(notifications[0].id).toMatch(/^ntf-/);
    });

    it('appends multiple notifications', () => {
      useNotificationCenterStore.getState().addNotification('info', 'First');
      useNotificationCenterStore.getState().addNotification('warning', 'Second');
      expect(useNotificationCenterStore.getState().notifications).toHaveLength(2);
    });
  });

  describe('markRead / markAllRead', () => {
    it('marks a single notification as read', () => {
      const id = useNotificationCenterStore.getState().addNotification('info', 'test');
      useNotificationCenterStore.getState().markRead(id);
      const n = useNotificationCenterStore.getState().notifications[0];
      expect(n.read).toBe(true);
    });

    it('marks all notifications as read', () => {
      useNotificationCenterStore.getState().addNotification('info', 'a');
      useNotificationCenterStore.getState().addNotification('error', 'b');
      useNotificationCenterStore.getState().markAllRead();
      for (const n of useNotificationCenterStore.getState().notifications) {
        expect(n.read).toBe(true);
      }
    });
  });

  describe('dismiss (single)', () => {
    it('removes a specific notification by id', () => {
      const id = useNotificationCenterStore.getState().addNotification('info', 'x');
      useNotificationCenterStore.getState().addNotification('error', 'y');
      useNotificationCenterStore.getState().dismiss(id);
      expect(useNotificationCenterStore.getState().notifications).toHaveLength(1);
      expect(useNotificationCenterStore.getState().notifications[0].message).toBe('y');
    });
  });

  describe('dismissBySeverity', () => {
    it('dismisses all notifications of a given severity', () => {
      useNotificationCenterStore.getState().addNotification('error', 'e1');
      useNotificationCenterStore.getState().addNotification('error', 'e2');
      useNotificationCenterStore.getState().addNotification('info', 'i1');
      useNotificationCenterStore.getState().dismissBySeverity('error');
      const remaining = useNotificationCenterStore.getState().notifications;
      expect(remaining).toHaveLength(1);
      expect(remaining[0].severity).toBe('info');
    });
  });

  describe('dismissAll', () => {
    it('removes all notifications', () => {
      useNotificationCenterStore.getState().addNotification('error', 'e');
      useNotificationCenterStore.getState().addNotification('warning', 'w');
      useNotificationCenterStore.getState().addNotification('success', 's');
      useNotificationCenterStore.getState().dismissAll();
      expect(useNotificationCenterStore.getState().notifications).toHaveLength(0);
    });
  });

  describe('filters', () => {
    it('setFilterSeverity updates the severity filter', () => {
      useNotificationCenterStore.getState().setFilterSeverity('error');
      expect(useNotificationCenterStore.getState().filters.severity).toBe('error');
    });

    it('setFilterReadStatus updates the read-status filter', () => {
      useNotificationCenterStore.getState().setFilterReadStatus('unread');
      expect(useNotificationCenterStore.getState().filters.readStatus).toBe('unread');
    });
  });
});

describe('notificationCenterCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useNotificationStore.getState().dismiss();
    useNotificationCenterStore.getState().dismissAll();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds to the notification centre and shows the singleton toast', () => {
    const id = notificationCenterCallback('succ', 'Bulk saved!');

    // Singleton toast is shown
    const toast = useNotificationStore.getState();
    expect(toast.alert).toBe(true);
    expect(toast.type).toBe('success');

    // Notification centre has the entry
    const { notifications } = useNotificationCenterStore.getState();
    expect(notifications).toHaveLength(1);
    expect(notifications[0].id).toBe(id);
    expect(notifications[0].severity).toBe('success');
    expect(notifications[0].read).toBe(false);
  });

  it('maps notification types to severity correctly', () => {
    notificationCenterCallback('err', 'err msg');
    expect(useNotificationCenterStore.getState().notifications[0].severity).toBe('error');

    notificationCenterCallback('warn', 'warn msg');
    expect(useNotificationCenterStore.getState().notifications[1].severity).toBe('warning');

    notificationCenterCallback('info', 'info msg');
    expect(useNotificationCenterStore.getState().notifications[2].severity).toBe('info');
  });
});

describe('groupBySeverity', () => {
  const makeEntry = (severity: Severity, message: string): NotificationEntry => ({
    id: `ntf-${message}`,
    severity,
    message,
    read: false,
    timestamp: 1000,
  });

  it('groups notifications into severity buckets', () => {
    const entries = [
      makeEntry('error', 'e1'),
      makeEntry('error', 'e2'),
      makeEntry('warning', 'w1'),
      makeEntry('info', 'i1'),
      makeEntry('success', 's1'),
      makeEntry('success', 's2'),
    ];
    const grouped = groupBySeverity(entries);
    expect(grouped.error).toHaveLength(2);
    expect(grouped.warning).toHaveLength(1);
    expect(grouped.info).toHaveLength(1);
    expect(grouped.success).toHaveLength(2);
  });

  it('returns empty arrays for severity levels with no entries', () => {
    const grouped = groupBySeverity([makeEntry('error', 'only')]);
    expect(grouped.error).toHaveLength(1);
    expect(grouped.warning).toHaveLength(0);
    expect(grouped.info).toHaveLength(0);
    expect(grouped.success).toHaveLength(0);
  });

  it('returns all four severity keys for an empty array', () => {
    const grouped = groupBySeverity([]);
    expect(Object.keys(grouped)).toEqual(['error', 'warning', 'info', 'success']);
  });
});

describe('filterNotifications', () => {
  const makeEntry = (severity: Severity, read: boolean): NotificationEntry => ({
    id: `ntf-${severity}-${read}`,
    severity,
    message: `${severity}-${read}`,
    read,
    timestamp: 1000,
  });

  const entries = [
    makeEntry('error', false),
    makeEntry('error', true),
    makeEntry('warning', false),
    makeEntry('info', true),
    makeEntry('success', false),
  ];

  it('returns all when filters are all/all', () => {
    const result = filterNotifications(entries, { severity: 'all', readStatus: 'all' });
    expect(result).toHaveLength(5);
  });

  it('filters by severity', () => {
    const result = filterNotifications(entries, { severity: 'error', readStatus: 'all' });
    expect(result).toHaveLength(2);
    expect(result.every(n => n.severity === 'error')).toBe(true);
  });

  it('filters by read status (unread)', () => {
    const result = filterNotifications(entries, { severity: 'all', readStatus: 'unread' });
    expect(result).toHaveLength(3);
    expect(result.every(n => !n.read)).toBe(true);
  });

  it('filters by read status (read)', () => {
    const result = filterNotifications(entries, { severity: 'all', readStatus: 'read' });
    expect(result).toHaveLength(2);
    expect(result.every(n => n.read)).toBe(true);
  });

  it('combines severity and read-status filters', () => {
    const result = filterNotifications(entries, { severity: 'error', readStatus: 'unread' });
    expect(result).toHaveLength(1);
    expect(result[0].severity).toBe('error');
    expect(result[0].read).toBe(false);
  });

  it('returns empty array when no entries match', () => {
    const result = filterNotifications(entries, { severity: 'warning', readStatus: 'read' });
    expect(result).toHaveLength(0);
  });
});
