import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  readonly USER_AUTHORITY = "USER";
  readonly SELLER_AUTHORITY = "SELLER";

  isLogin() : boolean{
    return localStorage.getItem('token') !== null;
  }

  setLoginToken(token: string, permission: string){
    localStorage.setItem('token', token);
    localStorage.setItem('authority', permission);
  }

  rmLoginToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('authority');
  }

  isSeller(){
    return localStorage.getItem('authority') === this.SELLER_AUTHORITY;
  }
  isUser(){
    return localStorage.getItem('authority') === this.USER_AUTHORITY;
  }

  getJwtToken(){
    return localStorage.getItem('token');
  }
}
