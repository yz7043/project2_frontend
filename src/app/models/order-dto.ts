export interface OrderDto {
  productId: number,
  quantity: number
}

export interface OrderRequest{
  order: OrderDto[]
}
