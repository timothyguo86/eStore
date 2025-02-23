// Local Import
import { Product } from './products.interface';

export interface CartItem {
  product: Product;
  quantity: number;
  amount: number;
}

export interface Cart {
  product: CartItem[];
  totalAmount: number;
  totalProducts: number;
}
