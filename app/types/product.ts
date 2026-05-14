export type ProductCategory =
  | 'camaras'
  | 'dvr-nvr'
  | 'kits-seguridad'
  | 'motores-portones'
  | 'pistones-automaticos'
  | 'interphones'

export type ProductAvailability = 'disponible' | 'bajo-stock' | 'agotado'

export interface Product {
  id: number
  slug: string
  name: string
  category: ProductCategory
  categoryLabel: string
  brand: string
  sku: string
  shortDescription: string
  price: number
  oldPrice?: number
  stock: number
  availability: ProductAvailability
  imageLabel: string
  featured: boolean
  specs: string[]
}