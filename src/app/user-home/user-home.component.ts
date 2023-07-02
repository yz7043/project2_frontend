import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {catchError} from "rxjs";
import {UserOrderDTO} from "../models/user-order-dto";
import {popNumber} from "rxjs/internal/util/args";
import {Router} from "@angular/router";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {OrderDetailResponse, OrderItemDetailDTO} from "../models/order-item-detail-dto";
import {ProductFrequencyDTO} from "../models/product-frequency-dto";

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit{
  orders: UserOrderDTO[] = []

  showDetail = false;

  currentOrderId: number | null = null;

  showProductDetail = false;

  currentProduct: OrderItemDetailDTO | null = null;

  frequentPurchased: ProductFrequencyDTO[] | null = null;

  constructor(private restAPI: RestApiService, private router: Router) {
  }
  ngOnInit(): void {
    this.refreshData();
  }

  getOrderDetail(orderId: number){
    this.showDetail = true;
    this.currentOrderId = orderId;
  }

  cancelOrder(orderId: number) {
    this.restAPI.cancelOrderById(orderId)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          alert("Cancelled Successfully!");
          this.refreshData();
        }
      })
  }

  hideDetail() {
    this.showDetail = false;
    this.currentOrderId = null;
  }

  refreshData(){
    this.restAPI.getUserOrders()
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (res) => {
          this.orders = res.orders;
        },
        error: (error: Error) => {
          console.log(error);
        }
      });
    this.restAPI.getUserFrequentResponse(3)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.frequentPurchased = res.frequentProducts;
        },
        error: (error: Error) => {
          console.log(error);
        }
      })
  }

  hideProductDetail(){
    this.showProductDetail = false;
    this.currentProduct = null
  }

  displayProductDetail(product: OrderItemDetailDTO){
    this.showProductDetail = true;
    this.currentProduct = product;
  }
}
