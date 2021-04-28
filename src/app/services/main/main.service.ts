import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  title: 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Miss',
  emailAddress: string;
  userRole: 'User' | 'Admin',
  password: string;
}

export enum Titles {
  Mr = 'Mr',
  Mrs = 'Mrs',
  Miss = 'Miss'
}
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private _storage: Storage;
  constructor(private storage: Storage) {
    this.init();
    console.log(this._storage);
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async initializeFirstUser(): Promise<void> {
    const users: User[] = [
      {
        id: 1,
        firstName: 'Boitumelo',
        lastName: 'Rampete',
        title: 'Mr',
        emailAddress: 'boitumelo.rampete@up.ac.za',
        userRole: 'Admin',
        password: 'Password'
      }
    ];
    await this._storage.set('users', users);
  }

  async readUsers(): Promise<User[]> {
    const users = await this._storage?.get('users');
    if (!users) {
      await this.initializeFirstUser();
      return await this._storage?.get('users');
    }

    return users;
  }

  async addUser(user: User): Promise<void> {
    const users: User[] = await this._storage.get('users');
    const lastID = Math.max(...users.map(x => x.id));
    user.id = lastID + 1;
    users.push(user);
    
    await this._storage.set('users', users);
  }

  async updateUser(user: User): Promise<void> {
    const users: User[] = await this.storage.get('users');

    const index = users.findIndex(x => x.id === user.id);

    if (index > -1) {
      users[index] = user;
      await this._storage.set('users', users);
    }
  }

  async deleteUser(user: User): Promise<void> {
    const users: User[] = await this._storage.get('users');
    
    const index = users.findIndex(x => x.id === user.id);

    if (index > 1) {
      users.splice(index, 1);
      await this._storage.set('users', users);
    }
  }
}
