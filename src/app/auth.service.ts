import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//Simula uma autenticação
export class AuthService {
  private _loggedIn = false;

  constructor() { }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this._loggedIn);
      }, 800);
    })
  }

  logIn() {
    this._loggedIn = true;
  }

  logOut() {
    this._loggedIn = false;
  }
}
