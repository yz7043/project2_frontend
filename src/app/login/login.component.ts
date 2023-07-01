import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {catchError, of, throwError} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LoginUserDto} from "../models/login-user-dto";
import {StorageService} from "../services/storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm = new FormBuilder().group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(255)]]
  })

  loginErrMsg = '';

  constructor(private restAPI: RestApiService, private storageService: StorageService) {
  }

  ngOnInit(): void {

  }

  login() {
    const username = this.loginForm.get("username")?.value;
    const password = this.loginForm.get("password")?.value;
    this.loginErrMsg = '';
    if(!username || !password){
      alert("Username or password cannot be empty");
      return;
    }
    this.restAPI.postLogin(username, password)
      .pipe(catchError(this.handleError))
      // .subscribe((res: LoginUserDto) => console.log(res));
      .subscribe({
        next: (res: LoginUserDto) => {
          this.storageService.setLoginToken(res.token);
        },
        error: (error: Error) => {
          // Handle the error here
          this.loginErrMsg = error.message;
        }
      });
  }


  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
