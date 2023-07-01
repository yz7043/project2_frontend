import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginUserDto} from "../models/login-user-dto";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  readonly baseURL = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  getTestData() {
    return this.http.get(this.baseURL + "/test");
  }

  postLogin(username: string, password: string){
    const body = {
      username: username,
      password: password
    }
    return this.http.post<LoginUserDto>(this.baseURL+"/login", body);
  }

  postRegister(username: string, password: string, email: string) {
    const body = {
      username: username,
      email: email,
      password: password
    }
    return this.http.post<{message: string}>(this.baseURL+'/signup', body);
  }
}
