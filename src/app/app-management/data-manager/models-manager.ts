/**
 * @authored by Kevin
 * Twitter @_ https://x.com/kaybarax
 * Github @_ https://github.com/kaybarax
 * LinkedIn @_ https://linkedin.com/in/kevin-barasa
 */

import { v1 } from 'uuid';

interface UserModel {
  id: string;
  name: string | null;
  usernameOrEmail: string | null;
  password: string | null;
}
export class User implements UserModel {
  id: string;
  name: string | null;
  usernameOrEmail: string | null;
  password: string | null;

  constructor() {
    this.id = v1();
    this.name = null;
    this.usernameOrEmail = null;
    this.password = null;
  }
}
