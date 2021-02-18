import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginFn(userInfo: User){
    localStorage.setItem('ACCESS_TOKEN', "access_token");
  }

  logoutFn(){
    localStorage.removeItem('ACCESS_TOKEN');
  }

  isLoggedIn(){
    return localStorage.getItem('ACCESS_TOKEN') !== null;

  }

  
}
