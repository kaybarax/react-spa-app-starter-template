/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

// Add TypeScript declarations for the global window properties
declare global {
  interface Window {
    idxDB: IDBFactory;
    db: IDBDatabase | undefined;
    indexedDB: IDBFactory;
    mozIndexedDB: IDBFactory;
    webkitIndexedDB: IDBFactory;
    msIndexedDB: IDBFactory;
  }
}

export const APP_INDEXED_DB_DATA_STORES = {
  USERS: 'USERS',
};

export const appIndexedDb = function (): void {
  console.log('Setup and/connect to indexedDb database');

  window.idxDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  window.db = undefined; //avail globally through window
  const dbReq = window.idxDB.open('appTestDb', 3);
  dbReq.onupgradeneeded = function (event: IDBVersionChangeEvent): void {
    // Set the db variable to our database so we can use it!
    window.db = (event.target as IDBOpenDBRequest).result;

    // Create an object store. Object stores
    // in databases are where data are stored.
    window.db.createObjectStore(APP_INDEXED_DB_DATA_STORES.USERS);
  };
  dbReq.onsuccess = function (event: Event): void {
    console.log('Connected to indexeddb database');
    window.db = (event.target as IDBOpenDBRequest).result;
  };
  dbReq.onerror = function (event: Event): void {
    alert('Error opening indexedDb database ' + (event.target as IDBOpenDBRequest)?.error);
  };
};
