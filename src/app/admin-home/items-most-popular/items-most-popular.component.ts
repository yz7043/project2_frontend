import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {catchError, Subscription} from "rxjs";
import {SoldItem} from "../../models/stats/sold-item";
import {RefreshChildService} from "../../services/refresh-child.service";

@Component({
  selector: 'app-items-most-popular',
  templateUrl: './items-most-popular.component.html',
  styleUrls: ['./items-most-popular.component.css']
})
export class ItemsMostPopularComponent implements OnInit, OnDestroy{
  orderItems: SoldItem[] = []
  subscription: Subscription = new Subscription();
  @Input() refresh: boolean = false;
  constructor(private restAPI: RestApiService, private refreshChildService: RefreshChildService) {
  }
  ngOnInit(): void {
    this.refreshData();
    this.subscription = this.refreshChildService.refreshChildren$.subscribe(() => {
      this.refreshData();
    });
  }

  refreshData(){
    this.restAPI.getStatsPopularItems(3)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.orderItems = resp.popularProducts;
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
