import {
  notificationCallback,
  dismissNotification,
  clearNotifications,
  useNotificationStore,
} from './notifications-controller';
import { buildNotificationKey } from './notification-utils';

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

  describe('deduplication', () => {
    it('does not re-trigger when the same notification (type + message) is already active', () => {
      notificationCallback('error', 'Something went wrong');
      const stateAfterFirst = useNotificationStore.getState();
      expect(stateAfterFirst.alert).toBe(true);
      expect(stateAfterFirst.type).toBe('error');
      expect(stateAfterFirst.message).toBe('Something went wrong');

      // Call again with identical args
      notificationCallback('error', 'Something went wrong');
      const stateAfterDup = useNotificationStore.getState();
      // alert should still be true (only one timer reset, not a full re-show)
      expect(stateAfterDup.alert).toBe(true);
      expect(stateAfterDup.message).toBe('Something went wrong');
    });

    it('resets the dismiss timer on duplicate call instead of replacing', () => {
      notificationCallback('info', 'Timer reset test', 'top', 1000);

      // Advance almost to the dismiss point
      vi.advanceTimersByTime(900);
      expect(useNotificationStore.getState().alert).toBe(true);

      // Duplicate — should reset the timer so it stays for another 1000ms
      notificationCallback('info', 'Timer reset test', 'top', 1000);

      // Advance only 200ms more — if timer was NOT reset, it would have dismissed
      vi.advanceTimersByTime(200);
      expect(useNotificationStore.getState().alert).toBe(true);

      // Now advance the remaining 800ms to reach the full duration after reset
      vi.advanceTimersByTime(800);
      expect(useNotificationStore.getState().alert).toBe(false);
    });

    it('allows a different notification to show while one is active', () => {
      notificationCallback('info', 'First notification');
      expect(useNotificationStore.getState().message).toBe('First notification');

      notificationCallback('error', 'Second notification');
      const state = useNotificationStore.getState();
      expect(state.message).toBe('Second notification');
      expect(state.type).toBe('error');
    });
  });

  describe('dismissNotification / clearNotifications', () => {
    it('dismissNotification hides the alert and clears message and severity', () => {
      notificationCallback('success', 'Done!', 'top', 5000, 'high');
      expect(useNotificationStore.getState().alert).toBe(true);

      dismissNotification();

      const state = useNotificationStore.getState();
      expect(state.alert).toBe(false);
      expect(state.message).toBeNull();
      expect(state.severity).toBeUndefined();
    });

    it('clearNotifications resets all state including type and notificationKey', () => {
      notificationCallback('warn', 'Warning message', 'bottom', 3000, 'critical');
      expect(useNotificationStore.getState().alert).toBe(true);

      clearNotifications();

      const state = useNotificationStore.getState();
      expect(state.alert).toBe(false);
      expect(state.message).toBeNull();
      expect(state.type).toBeNull();
      expect(state.severity).toBeUndefined();
      expect(state.notificationKey).toBeUndefined();
    });

    it('clearNotifications cancels the pending dismiss timer', () => {
      notificationCallback('info', 'Will be cleared');
      clearNotifications();

      // After clear, advance past the original duration to verify no auto-dismiss fires
      vi.advanceTimersByTime(5000);
      expect(useNotificationStore.getState().alert).toBe(false);
    });
  });

  describe('severity', () => {
    it('accepts and stores a severity level', () => {
      notificationCallback('error', 'Critical failure', 'top', 3500, 'critical');
      const state = useNotificationStore.getState();
      expect(state.severity).toBe('critical');
    });

    it('defaults severity to undefined when not provided', () => {
      notificationCallback('info', 'No severity');
      expect(useNotificationStore.getState().severity).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('handles an empty message string gracefully', () => {
      notificationCallback('info', '');
      const state = useNotificationStore.getState();
      // Falls back to the default message in the controller
      expect(state.message).toBe('You have not specified a message');
      expect(state.alert).toBe(true);
    });

    it('buildNotificationKey handles null message', () => {
      const key = buildNotificationKey('info', null);
      expect(key).toBe('info::::none');
    });

    it('buildNotificationKey handles undefined message', () => {
      const key = buildNotificationKey('error', undefined);
      expect(key).toBe('error::::none');
    });

    it('normalizes err to error even with severity', () => {
      notificationCallback('err', 'Error with severity', 'top', 3500, 'high');
      const state = useNotificationStore.getState();
      expect(state.type).toBe('error');
      expect(state.severity).toBe('high');
    });
  });
});
