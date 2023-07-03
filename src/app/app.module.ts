import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { UserHomeComponent } from './user-home/user-home.component';
import {InterceptorService} from "./services/interceptor.service";
import { DetailComponent } from './user-home/detail/detail.component';
import { ProductDetailComponent } from './user-home/product-detail/product-detail.component';
import { ProductComponent } from './product/product.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminOrderComponent } from './admin-order/admin-order.component';
import { AdminProductComponent } from './admin-product/admin-product.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    NotFoundComponent,
    UserHomeComponent,
    DetailComponent,
    ProductDetailComponent,
    ProductComponent,
    AdminHomeComponent,
    AdminOrderComponent,
    AdminProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
