import {StatusResponse} from "./status-response";

export interface OrderItemDetailDTO {
  id: number,
  purchasedPrice: number,
  quantity: number,
  product: {
    id: number,
    name: string,
    description: string,
    retailPrice: number
  }
}

export interface OrderDetailResponse{
  status: StatusResponse,
  id: number,
  orderStatus: string,
  datePlaced: string,
  orderItems: OrderItemDetailDTO[]
}
