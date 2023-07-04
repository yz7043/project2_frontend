import {StatusResponse} from "../status-response";

export interface UserRecentProductDto {
  productId: number,
  name: string,
  description: string,
  datePurchased: string
}

export interface UserRecentProductResponse{
  status: StatusResponse,
  recentProducts: UserRecentProductDto[]
}
