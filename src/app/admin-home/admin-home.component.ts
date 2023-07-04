import {Component, OnInit, TemplateRef} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {AdminAllOrderResponse, AdminOrderDto} from "../models/admin-order-dto";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {catchError} from "rxjs";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  orders: AdminAllOrderResponse | null = null;
  constructor(private restAPI: RestApiService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.refreshAllOrders(0);
  }

  refreshData(page = 0){
    this.refreshAllOrders(page);
  }

  refreshAllOrders(page = 0){
    this.restAPI.getAdminOrders(page)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.orders = resp;
        },
        error: (err) => {
          alert(err.error.message);
        }
      })

  }

  nextPage(){
    if(this.orders && this.orders.currentPage + 1 < this.orders.totalPages)
      this.refreshAllOrders(this.orders.currentPage + 1)
  }
  prevPage(){
    if(this.orders && this.orders.currentPage > 0){
      this.refreshAllOrders(this.orders.currentPage - 1);
    }
  }

  cancelOrder(id: number){
    this.restAPI.adminCancelOrder(id)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          alert(`Order ${id} cancelled!`);
          this.refreshAllOrders(this.orders ? this.orders.currentPage : 0);
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
  }

  completeOrder(id: number){
    this.restAPI.adminCompleteOrder(id)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          alert(`Order ${id} completed!`);
          this.refreshAllOrders(this.orders ? this.orders.currentPage : 0);
        },
        error: (err) => {
          alert(err.error.message);
        }
      })
  }
}
