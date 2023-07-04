import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {RestApiService} from "../../services/rest-api.service";
import {SoldItem} from "../../models/stats/sold-item";
import {catchError, Subscription} from "rxjs";
import {RefreshChildService} from "../../services/refresh-child.service";

@Component({
  selector: 'app-all-sold-item',
  templateUrl: './all-sold-item.component.html',
  styleUrls: ['./all-sold-item.component.css']
})
export class AllSoldItemComponent implements OnInit, OnDestroy{
  soldItems: SoldItem[] = []
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
    this.restAPI.getAllSoldItems()
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.soldItems = resp.popularProducts;
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
