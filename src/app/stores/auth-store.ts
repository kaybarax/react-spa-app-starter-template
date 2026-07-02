/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAppStore, clearAllPersistedStores } from './stores';
import { STORE_KEY_SUFFIX } from './actions-and-stores-data';
import { appNavigation, AppRoutes } from '../routing-and-navigation/app-navigation';

export interface AuthState {
  isAuthenticated: boolean;
  checkAuthentication: () => boolean;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      checkAuthentication: () => {
        // Authenticated when a login has happened and the logged-in user
        // is still present in the app store. Replace with a token/session
        // check when you hook up a real authentication backend.
        const isAuthenticated = get().isAuthenticated && useAppStore.getState().user !== null;
        set({ isAuthenticated });
        return isAuthenticated;
      },
      login: (redirectTo?: string) => {
        set({ isAuthenticated: true });
        const destination = redirectTo || AppRoutes.SECURED_HOME;
        appNavigation.navigateTo(destination);
      },
      logout: () => {
        // Clear user data and all persisted working state
        useAppStore.setState({ user: null });
        clearAllPersistedStores();
        set({ isAuthenticated: false });
        appNavigation.navigateTo(AppRoutes.LOGIN);
      },
    }),
    {
      name: `auth-store-${STORE_KEY_SUFFIX}`,
    },
  ),
);

/**
 * Singleton facade over the auth store, for use outside React components
 * (controllers, navigation logic).
 */
export class AuthStore {
  private static instance: AuthStore | null = null;
  static namespace = 'AuthStore_' + STORE_KEY_SUFFIX;

  private constructor() {}

  public static getInstance(): AuthStore {
    if (!AuthStore.instance) {
      AuthStore.instance = new AuthStore();
    }
    return AuthStore.instance;
  }

  isAuthenticated(): boolean {
    return useAuthStore.getState().checkAuthentication();
  }

  handleLogin(redirectTo?: string): void {
    useAuthStore.getState().login(redirectTo);
  }

  handleLogout(): void {
    useAuthStore.getState().logout();
  }
}

// Export the singleton instance
const authStore = AuthStore.getInstance();
export default authStore;
