import { createStore } from './createStore';

interface CounterState {
  count: number;
  label: string;
}

describe('createStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with the provided state', () => {
    const useCounterStore = createStore<CounterState>('counterInit', { count: 0, label: 'counter' });
    expect(useCounterStore.getState().count).toBe(0);
    expect(useCounterStore.getState().label).toBe('counter');
  });

  it('updates state through setState', () => {
    const useCounterStore = createStore<CounterState>('counterUpdate', { count: 0, label: 'counter' });
    useCounterStore.setState(state => ({ count: state.count + 1 }));
    expect(useCounterStore.getState().count).toBe(1);
  });

  it('restores the initial state on reset', () => {
    const useCounterStore = createStore<CounterState>('counterReset', { count: 0, label: 'counter' });
    useCounterStore.setState({ count: 41, label: 'changed' });
    useCounterStore.getState().reset();
    expect(useCounterStore.getState().count).toBe(0);
    expect(useCounterStore.getState().label).toBe('counter');
  });

  it('persists state to localStorage under the app-store prefix', () => {
    const useCounterStore = createStore<CounterState>('counterPersist', { count: 0, label: 'counter' });
    useCounterStore.setState({ count: 7 });

    const persisted = localStorage.getItem('app-store-counterPersist');
    expect(persisted).not.toBeNull();
    expect(JSON.parse(persisted as string).state.count).toBe(7);
  });
});
