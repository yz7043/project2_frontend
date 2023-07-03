import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserHomeComponent} from "./user-home/user-home.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ProductComponent} from "./product/product.component";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {AuthAdminGuardService} from "./services/auth-admin-guard.service";
import {AdminProductComponent} from "./admin-product/admin-product.component";
import {AdminOrderComponent} from "./admin-order/admin-order.component";

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'userHome', component: UserHomeComponent, canActivate: [AuthGuardService]},
  { path: 'userProduct', component: ProductComponent, canActivate: [AuthGuardService]},
  { path: 'adminHome', component: AdminHomeComponent, canActivate: [AuthAdminGuardService]},
  { path: 'adminProduct', component: AdminProductComponent, canActivate: [AuthAdminGuardService]},
  { path: 'adminOrder', component: AdminOrderComponent, canActivate: [AuthAdminGuardService]},

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
