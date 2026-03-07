export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
