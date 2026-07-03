import { createStore } from './createStore';
import { LOGIN_PAGE_ACTIONS, LoginPageAction } from './actions-and-stores-data';
import { User } from '../app-management/data-manager/models-manager';

// Define interfaces for store states
export interface NavStore {
  navigationTrail: string[];
  currentNavigationTrailIndex: number;
  navigatedTo: string | null;
  navigatedFrom: string | null;
}

export interface AppState {
  user: User | null;
  navStore: NavStore;
  loading: boolean;
  loadingMessage: string;
}

export interface LoginState {
  pageAction: LoginPageAction;
  loading: boolean;
  loadingMessage: string;
}

export interface PageExampleState {
  todo: unknown[];
  loading: boolean;
  loadingMessage: string;
}

export interface SecuredAppState {
  clicksCount: number;
}

export interface UserPreferencesState {
  themeMode: 'light' | 'dark';
  density: 'comfortable' | 'compact';
  reducedMotion: boolean;
}

// Create stores with initial states
export const useAppStore = createStore<AppState>('appStore', {
  user: null,
  navStore: {
    navigationTrail: [],
    currentNavigationTrailIndex: 0,
    navigatedTo: null,
    navigatedFrom: null,
  },
  loading: false,
  loadingMessage: 'Loading...',
});

export const useLoginStore = createStore<LoginState>('loginStore', {
  pageAction: LOGIN_PAGE_ACTIONS.LOGIN,
  loading: false,
  loadingMessage: 'Loading...',
});

export const usePage1ExampleStore = createStore<PageExampleState>('page1ExampleStore', {
  todo: [],
  loading: false,
  loadingMessage: 'Loading...',
});

export const usePage2ExampleStore = createStore<PageExampleState>('page2ExampleStore', {
  todo: [],
  loading: false,
  loadingMessage: 'Loading...',
});

export const usePage3ExampleStore = createStore<PageExampleState>('page3ExampleStore', {
  todo: [],
  loading: false,
  loadingMessage: 'Loading...',
});

export const usePage4ExampleStore = createStore<PageExampleState>('page4ExampleStore', {
  todo: [],
  loading: false,
  loadingMessage: 'Loading...',
});

export const useSecuredAppStore = createStore<SecuredAppState>('securedAppStore', {
  clicksCount: 0,
});

export const useUserPreferencesStore = createStore<UserPreferencesState>('userPreferences', {
  themeMode: 'light',
  density: 'comfortable',
  reducedMotion: false,
});

// Function to reset all stores
export function resetAllStores() {
  useAppStore.getState().reset();
  useLoginStore.getState().reset();
  usePage1ExampleStore.getState().reset();
  usePage2ExampleStore.getState().reset();
  usePage3ExampleStore.getState().reset();
  usePage4ExampleStore.getState().reset();
  useSecuredAppStore.getState().reset();
  useUserPreferencesStore.getState().reset();
}

// Function to clear all persisted stores from localStorage
export function clearAllPersistedStores() {
  const keys = Object.keys(localStorage);
  for (const key of keys) {
    if (key.startsWith('app-store-')) {
      localStorage.removeItem(key);
    }
  }
}
