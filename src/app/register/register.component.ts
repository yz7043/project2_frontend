import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {catchError, throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm = new FormBuilder().group({
    username: ['', [Validators.required, Validators.maxLength(255)]],
    password: ['', [Validators.required, Validators.maxLength(255)]],
    passwordConfirm: ['', [Validators.required, Validators.maxLength(255)]],
    email: ['', [Validators.required, Validators.maxLength(255)]]
  })

  errorMsg = '';
  constructor(private restAPI: RestApiService, private router: Router) {
  }
  ngOnInit(): void {
  }

  register(){
    const username = this.registerForm.get("username")?.value;
    const password = this.registerForm.get("password")?.value;
    const passwordConfirm = this.registerForm.get("passwordConfirm")?.value;
    const email = this.registerForm.get("email")?.value;
    this.errorMsg = '';
    if(!username || !password || ! passwordConfirm || !email){
      alert("All fields are required!");
      return;
    }
    // console.log(`${username}, ${password}, ${passwordConfirm}, ${email}`);
    if(password !== passwordConfirm){
      this.errorMsg = "Two password not match!";
      return;
    }
    this.restAPI.postRegister(username, password, email)
      .pipe(catchError(this.handleError))
      .subscribe({
        next: (res) => {
          alert('Register Successful!');
          this.router.navigate(['/login']);
        },
        error: (error: Error) => {
          this.errorMsg = error.message;
        }
      })
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
