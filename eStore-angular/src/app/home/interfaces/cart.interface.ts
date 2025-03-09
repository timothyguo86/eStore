// Local Import
import { Product } from './products.interface';

export interface CartItem {
  product: Product;
  quantity: number;
  amount: number;
}

export interface Cart {
  products: CartItem[];
  totalAmount: number;
  totalProducts: number;
}

export interface DeliveryAddress {
  userName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
}
