import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {AdminAllOrderResponse} from "../models/admin-order-dto";
import {catchError} from "rxjs";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  orders: AdminAllOrderResponse | null = null;
  constructor(private restAPI: RestApiService) {
  }

  ngOnInit(): void {
    this.refreshAllOrders(0);
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

}
