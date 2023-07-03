export interface AdminOrderDto {
  orderId: number,
  datePlaced: string,
  status: string,
  username: string,
  userId: number,
}

export interface AdminAllOrderResponse {
  totalPages: number,
  currentPage: number,
  orders: AdminOrderDto[]
}
