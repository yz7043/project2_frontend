import { Component } from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {ProductDto} from "../models/product-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError} from "rxjs";

@Component({
  selector: 'app-user-product-detail',
  templateUrl: './user-product-detail.component.html',
  styleUrls: ['./user-product-detail.component.css']
})
export class UserProductDetailComponent {
  id : number | null = null;
  product: ProductDto | null = null;
  constructor(private restAPI: RestApiService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.refreshData();
    })
  }

  refreshData(){
    if(this.id){
      this.restAPI.getUserProductDetail(this.id)
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
    this.router.navigate(['userProduct']);
  }
}
