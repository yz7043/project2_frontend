import { Component } from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {StorageService} from "../services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public storageService: StorageService,
              private router: Router) {
  }
  logout(){
    this.storageService.rmLoginToken();
    this.router.navigate(['/login']);
  }
}
