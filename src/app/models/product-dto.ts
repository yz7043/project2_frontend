export interface ProductDto {
  id: number,
  description: string,
  name: string,
  quantity: number,
  retailPrice: number
}

export interface InStockProductsResponse{
  products: ProductDto[]
}
