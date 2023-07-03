import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserHomeComponent} from "./user-home/user-home.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'userHome', component: UserHomeComponent, canActivate: [AuthGuardService]},
  { path: 'userProduct', component: ProductComponent, canActivate: [AuthGuardService]},
  { path: 'adminHome', component: NotFoundComponent, canActivate: [AuthGuardService]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
