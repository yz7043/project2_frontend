import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs";
import {AdminProductDTO} from "../models/product-dto";

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit{
  id : number | null = null;
  product: AdminProductDTO | null = null;
  constructor(private restAPI: RestApiService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.refreshData();
    })
  }
  ngOnInit(): void {
  }

  refreshData(){
    if(this.id){
      this.restAPI.getAdminProductById(this.id)
        .pipe(catchError(this.restAPI.handleError))
        .subscribe({
          next: (resp) => {
            this.product = resp;
          },
          error: (err) => {
            console.error(err.error.message());
          }
        })

    }
  }

  toProductPage(){
    this.router.navigate(['adminProduct']);
  }
}
