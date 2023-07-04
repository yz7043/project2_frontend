import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {catchError, Subscription} from "rxjs";
import {ProfitableItem} from "../../models/stats/sold-item";
import {RefreshChildService} from "../../services/refresh-child.service";

@Component({
  selector: 'app-items-most-profit',
  templateUrl: './items-most-profit.component.html',
  styleUrls: ['./items-most-profit.component.css']
})
export class ItemsMostProfitComponent implements OnInit, OnDestroy{
  orderItems: ProfitableItem[] = []
  subscription: Subscription = new Subscription();
  constructor(private restAPI: RestApiService, private refreshChildService: RefreshChildService) {
  }
  ngOnInit(): void {
    this.refreshData();
    this.subscription = this.refreshChildService.refreshChildren$.subscribe(() => {
      this.refreshData();
    });
  }

  refreshData(){
    this.restAPI.getStatsProfitableItems(3)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.orderItems = resp.profitableProducts;
        },
        error: (err) => {
          console.log(err.error.message);
        }
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
