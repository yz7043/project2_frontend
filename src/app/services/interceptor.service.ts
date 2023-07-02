import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  constructor(private storageService: StorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.storageService.getJwtToken();
    if (jwt) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + jwt)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
