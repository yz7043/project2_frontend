import {StatusResponse} from "./status-response";

export interface WatchListItem {
  id: number,
  description: string,
  name: string,
  quantity: number,
  retailPrice: number
}

export interface WatchListResponse {
  status: StatusResponse,
  products: WatchListItem[]
}
