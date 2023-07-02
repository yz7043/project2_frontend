import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserOrderDTO} from "../../models/user-order-dto";
import {OrderItemDetailDTO} from "../../models/order-item-detail-dto";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @Input() product: OrderItemDetailDTO | null = null;
  @Output() close = new EventEmitter<void>();

  closeProduct(){
    this.close.emit();
  }

  stopPropagation(event: Event){
    event.stopPropagation();
  }
}
