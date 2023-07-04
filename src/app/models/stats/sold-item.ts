import {StatusResponse} from "../status-response";

export interface SoldItem {
  productId: number,
  name: string,
  description: string,
  sales: number
}

export interface SoldItemResponse{
  status: StatusResponse,
  popularProducts: SoldItem[]
}

export interface ProfitableItem{
  productId: number,
  name: string,
  description: string,
  profit: number
}

export interface ProfitableItemResponse{
  status: StatusResponse,
  profitableProducts: ProfitableItem[]
}
