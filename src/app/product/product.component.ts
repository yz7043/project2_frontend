import {Component, OnInit} from '@angular/core';
import {RestApiService} from "../services/rest-api.service";
import {ProductDto} from "../models/product-dto";
import {WatchListItem} from "../models/watch-list-item";
import {catchError} from "rxjs";


interface CartItem{
  product: ProductDto,
  quantity: number
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  inStockProducts : ProductDto[] = [];
  watchList: WatchListItem[] = [];
  shopCart: CartItem[] = [];

  constructor(private restAPI: RestApiService) {
  }

  ngOnInit(): void {
    this.refreshProductData();
    this.refreshWatchList();
    this.refreshShopCar();
  }

  refreshProductData(){
    this.restAPI.getAllInStockProducts()
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.inStockProducts = resp.products;
          console.log(this.inStockProducts);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  refreshWatchList() {
    this.restAPI.getWatchList()
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.watchList = resp.products;
          console.log(this.watchList)
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  refreshShopCar(){
    this.shopCart = []
  }

  isInShopCard(id:number){
    return this.shopCart.find((p)=>p.product.id === id) !== undefined;
  }

  isInWatchList(id: number){
    return this.watchList.find((p) => p.id === id) !== undefined;
  }

  getShopCardTotalPrice(){
    let res = 0;
    this.shopCart.forEach((p) => res += p.quantity * p.product.retailPrice);
    return res;
  }

  addToShopCart(product: ProductDto){
    let idx = this.shopCart.findIndex((p)=>p.product.id === product.id);
    if(idx !== -1){
      this.shopCart[idx].quantity ++;
    }else{
      let deepCopy = JSON.parse(JSON.stringify({product: product, quantity: 1}));
      this.shopCart.push(deepCopy);
    }
  }

  addCartItemNumber(curIdx: number){
    this.shopCart[curIdx].quantity++;
  }

  decreaseCartItemNumber(curIdx: number){
    this.shopCart[curIdx].quantity--;
    if(this.shopCart[curIdx].quantity === 0){
      this.shopCart.splice(curIdx, 1);
    }
  }

  addToWatchList(product: ProductDto){
    this.restAPI.addToWatchList(product.id)
      .pipe(catchError(this.restAPI.addToWatchList))
      .subscribe({
        next: (resp) => {
          this.refreshWatchList();
        }
      })
  }

  removeFromWatchList(product: WatchListItem){
    this.restAPI.removeFromWatchList(product.id)
      .pipe(catchError(this.restAPI.handleError))
      .subscribe({
        next: (resp) => {
          this.refreshWatchList();
        }
      })
  }
}
