import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {catchError, of, throwError} from "rxjs";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {LoginUserDto} from "../models/login-user-dto";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

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

  constructor(private restAPI: RestApiService, private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    if(this.storageService.isSeller()){
      this.router.navigate(['adminHome'])
    }else if(this.storageService.isUser()){
      this.router.navigate(['userHome']);
    }

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
      .subscribe({
        next: (res: LoginUserDto) => {
          this.storageService.setLoginToken(res.token);
          if(this.storageService.isUser())
            this.router.navigate(['userHome']);
          else if(this.storageService.isSeller())
            this.router.navigate(['adminHome']);
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
