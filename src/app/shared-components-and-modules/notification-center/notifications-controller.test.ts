import { notificationCallback, useNotificationStore } from './notifications-controller';

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
