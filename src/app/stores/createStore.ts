import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Creates a zustand store with persistence to localStorage
 *
 * @param name The name of the store (used for localStorage key)
 * @param initialState The initial state of the store
 * @returns A zustand store with persistence
 */
export function createStore<T extends object>(name: string, initialState: T) {
  return create<
    T & {
      reset: () => void;
    }
  >()(
    persist(
      set => ({
        ...initialState,
        reset: () => set(initialState),
      }),
      {
        name: `app-store-${name}`,
      },
    ),
  );
}
