import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginUserDto} from "../models/login-user-dto";
import {throwError} from "rxjs";
import {UserOrderDTO} from "../models/user-order-dto";
import {AdminOrderDetailResponse, OrderDetailResponse} from "../models/order-item-detail-dto";
import {ProductFrequencyResponse} from "../models/product-frequency-dto";
import {WatchListResponse} from "../models/watch-list-item";
import {
  AdminProductDTO,
  AdminProductModifyRequest,
  AdminProductsResponse,
  InStockProductsResponse
} from "../models/product-dto";
import {StatusResponse} from "../models/status-response";
import {OrderRequest} from "../models/order-dto";
import {AdminAllOrderResponse} from "../models/admin-order-dto";
import {ProfitableItemResponse, SoldItemResponse} from "../models/stats/sold-item";

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  readonly baseURL = "http://localhost:8080"
  constructor(private http: HttpClient) { }

  getTestData() {
    return this.http.get(this.baseURL + "/test");
  }

  postLogin(username: string, password: string){
    const body = {
      username: username,
      password: password
    }
    return this.http.post<LoginUserDto>(this.baseURL+"/login", body);
  }

  postRegister(username: string, password: string, email: string) {
    const body = {
      username: username,
      email: email,
      password: password
    }
    return this.http.post<{message: string}>(this.baseURL+'/signup', body);
  }

  getUserOrders(){
    return this.http.get<{orders: UserOrderDTO[]}>(this.baseURL+'/orders/all');
  }

  getUserOrderDetail(orderId: number) {
    return this.http.get<OrderDetailResponse>(`${this.baseURL}/orders/${orderId}`);
  }

  cancelOrderById(orderId: number){
    return this.http.patch<{message: string}>(`${this.baseURL}/orders/${orderId}/cancel`, null);
  }

  getUserFrequentResponse(limit: number){
    return this.http.get<ProductFrequencyResponse>(`${this.baseURL}/products/frequent/${limit}`);
  }

  getWatchList(){
    return this.http.get<WatchListResponse>(`${this.baseURL}/watchlist/products/all`);
  }

  removeFromWatchList(id: number) {
    return this.http.delete<StatusResponse>(`${this.baseURL}/watchlist/product/${id}`);
  }

  addToWatchList(id: number){
    return this.http.post<StatusResponse>(`${this.baseURL}/watchlist/product/${id}`, null);
  }

  getAllInStockProducts(){
    return this.http.get<InStockProductsResponse>(`${this.baseURL}/products/all`);
  }

  placeOrder(orderRequest: OrderRequest){
    return this.http.post<StatusResponse>(`${this.baseURL}/orders`, orderRequest);
  }

  getAdminOrders(page=0){
    return this.http.get<AdminAllOrderResponse>(`${this.baseURL}/orders/all?page=${page}`);
  }

  adminCancelOrder(orderId: number){
    return this.http.patch<StatusResponse>(`${this.baseURL}/orders/${orderId}/cancel`, null);
  }

  adminCompleteOrder(orderId: number) {
    return this.http.patch<StatusResponse>(`${this.baseURL}/orders/${orderId}/complete`, null);
  }

  getAdminOrderDetail(orderId: number) {
    return this.http.get<AdminOrderDetailResponse>(`${this.baseURL}/orders/${orderId}`);
  }

  // stats request
  getAllSoldItems(){
    return this.http.get<SoldItemResponse>(`${this.baseURL}/products/items`);
  }

  getStatsPopularItems(limit: number = 3){
    return this.http.get<SoldItemResponse>(`${this.baseURL}/products/popular/${limit}`);
  }

  getStatsProfitableItems(limit: number = 3){
    return this.http.get<ProfitableItemResponse>(`${this.baseURL}/products/profit/${limit}`);
  }

  getAdminAllProducts(){
    return this.http.get<AdminProductsResponse>(`${this.baseURL}/products/all`);
  }

  getAdminProductById(id: number){
    return this.http.get<AdminProductDTO>(`${this.baseURL}/products/${id}`);
  }

  adminModifyProduct(product: AdminProductModifyRequest, id: number){
    return this.http.patch<StatusResponse>(`${this.baseURL}/products/${id}`, product);
  }

  adminAddProduct(product: AdminProductModifyRequest){
    return this.http.post<StatusResponse>(`${this.baseURL}/products`, product);
  }


  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}
