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

export interface AdminProductDTO{
  id: number,
  description: string,
  name: string,
  quantity: number,
  retailPrice: number,
  wholesalePrice: number
}

export interface AdminProductsResponse{
  products: AdminProductDTO[]
}

export interface AdminProductModifyRequest{
  name: string | null | undefined
  description: string | null | undefined,
  wholesalePrice: number | null | undefined,
  retailPrice: number | null | undefined,
  quantity: number | null | undefined,
}
