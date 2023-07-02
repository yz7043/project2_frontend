import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {OrderDetailResponse} from "../../models/order-item-detail-dto";
import {RestApiService} from "../../services/rest-api.service";
import {catchError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnChanges{
  @Input() show: boolean = false;
  @Output() closeEvent = new EventEmitter<void>();
  @Input() orderId: number | null = null;
  @Output() orderCancelled = new EventEmitter<void>();
  detailData: OrderDetailResponse | null = null;

  constructor(private restAPI: RestApiService, private router: Router) {
  }

  ngOnChanges(){
    if(this.show){
      // todo
      console.log(this.orderId);
      this.restAPI.getUserOrderDetail(this.orderId as number)
        .pipe(catchError(this.restAPI.handleError))
        .subscribe({
          next: (resp) => {
            console.log(resp);
            this.detailData = resp;
          },
          error: (err) => {
            console.log(err);
          }
        })
    }else{
      this.orderId = null;
    }
  }

  close(){
    this.closeEvent.emit();
  }

  stopPropagation(event: Event){
    event.stopPropagation();
  }

  cancelOrder(){
    if(this.orderId){
      this.restAPI.cancelOrderById(this.orderId)
        .pipe(catchError(this.restAPI.handleError))
        .subscribe({
          next: (resp) => {
            alert("Cancelled Successfully!");
            this.orderCancelled.emit();
            this.close();
          }
        })
    }
  }
  showProductDetail(){}
}
