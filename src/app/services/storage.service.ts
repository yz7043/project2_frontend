import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  isLogin() : boolean{
    return localStorage.getItem('token') !== null;
  }

  setLoginToken(token: string){
    localStorage.setItem('token', token);
  }

  rmLoginToken(){
    localStorage.removeItem('token');
  }
}
