/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

export const STORE_KEY_SUFFIX = 'StoreKey';

export const STORE_SNAPSHOT_PREFIX = 'StoreSnapshot_';

export const LOGIN_PAGE_ACTIONS = {
  LOGIN: 'LOGIN',
  SIGN_UP: 'SIGN_UP',
  RESET_PASSWORD: 'RESET_PASSWORD',
};

export type LoginPageAction = (typeof LOGIN_PAGE_ACTIONS)[keyof typeof LOGIN_PAGE_ACTIONS];
