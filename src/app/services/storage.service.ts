import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
interface JwtAuth{
  sub: string
  permissions: { authority: string}[]
}
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

  setLoginToken(token: string){
    localStorage.setItem('token', token);
  }

  rmLoginToken(){
    localStorage.removeItem('token');
  }

  isSeller(){
    const resolvedToken = this.decodeJwt();
    if(!resolvedToken)
      return  false;
    return  resolvedToken.permissions.find((auth) => auth.authority === this.SELLER_AUTHORITY) !== undefined;
  }

  isUser(){
    const resolvedToken = this.decodeJwt();
    if(!resolvedToken)
      return  false;
    return  resolvedToken.permissions.find((auth) => auth.authority === this.USER_AUTHORITY) !== undefined;
  }

  decodeJwt() {
    const token = localStorage.getItem('token');
    if(!token)
      return null;
    return jwt_decode(token) as JwtAuth;
  }

  getJwtToken(){
    return localStorage.getItem('token');
  }

  saveToSession(key: string, val: any){
    sessionStorage.setItem(key, JSON.stringify(val));
  }

  getFromSession(key: string) {
    return sessionStorage.getItem(key);
  }

  rmFromSession(key: string){
    sessionStorage.removeItem(key);
  }
}
