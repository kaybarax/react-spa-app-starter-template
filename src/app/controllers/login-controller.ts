/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { notificationCallback } from '../shared-components-and-modules/notification-center/notifications-controller';
import { APP_INDEXED_DB_DATA_STORES } from '../app-management/data-manager/indexeddb-manager';
import { User } from '../app-management/data-manager/models-manager';
import { useAppStore } from '../stores';
import authStore from '../stores/auth-store';

export interface LoginCredentials {
  usernameOrEmail: string;
  password: string;
}

export function handleSignUp(user: User, onSignUpSuccess?: () => void): void {
  //save to indexedDb if you fancy
  const db = window.db; //get db;
  if (!db) {
    console.error('Database not initialized');
    notificationCallback('err', 'Local database not initialized');
    return;
  }

  // Start a database transaction and get the users object store
  const tx = db.transaction([APP_INDEXED_DB_DATA_STORES.USERS], 'readwrite');
  const store = tx.objectStore(APP_INDEXED_DB_DATA_STORES.USERS);
  // Put the user into the object store, keyed by their id
  const { id: userId, ...userRecord } = user;
  store.add(userRecord, userId);
  // Wait for the database transaction to complete
  tx.oncomplete = function () {
    notificationCallback('succ', 'Sign up success');
    if (onSignUpSuccess) {
      //some time to allow the alert to display
      setTimeout(onSignUpSuccess, 1500);
    }
  };
  tx.onerror = function (event: Event) {
    console.log('error storing user ' + (event.target as IDBTransaction).error);
    notificationCallback('err', 'Sign up failed!');
  };
}

export function handleLogin(credentials: LoginCredentials): void {
  const db = window.db; //get db;
  if (!db) {
    console.error('Database not initialized');
    notificationCallback('err', 'Local database not initialized');
    return;
  }

  // Set up an object store and transaction
  const tx = db.transaction([APP_INDEXED_DB_DATA_STORES.USERS], 'readonly');
  const store = tx.objectStore(APP_INDEXED_DB_DATA_STORES.USERS);

  // Set up a request to get all users
  const req = store.getAll();

  req.onerror = function (event: Event) {
    console.log('error getting users ', (event.target as IDBRequest).error);
    notificationCallback('err', 'Cannot query users');
  };

  req.onsuccess = function (event: Event) {
    const users = (event.target as IDBRequest<User[]>).result;

    const user = users.find(
      item => item.usernameOrEmail === credentials.usernameOrEmail && item.password === credentials.password,
    );
    if (!user) {
      notificationCallback('err', 'User not found');
      return;
    }
    useAppStore.setState({ user: { ...user } });
    notificationCallback('succ', 'Login success');
    //to allow notification display before navigating away
    setTimeout(() => authStore.handleLogin(), 1500);
  };
}

export function handleResetPassword(): void {
  //todo: ... your logic ... you get the drill by now
  notificationCallback('info', 'You can play around with this, mate. Cheers!');
}
