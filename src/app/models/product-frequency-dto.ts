import {StatusResponse} from "./status-response";

export interface ProductFrequencyDTO {
  productId: number,
  name: number,
  description: string,
  frequency: number
}

export  interface  ProductFrequencyResponse{
  status: StatusResponse,
  frequentProducts: ProductFrequencyDTO[]
}
