import { ProductListItem } from '../components/products/products.type';

export const products: ProductListItem[] = [
  {
    id: 1,
    product_name: 'Jacket',
    product_img: 'shop-1',
    price: 100,
    ratings: 4.6,
  },
  {
    id: 2,
    product_name: 'Purse',
    product_img: 'shop-2',
    price: 25,
    ratings: 3.2,
  },
  {
    id: 3,
    product_name: 'Dress',
    product_img: 'shop-3',
    price: 45,
    ratings: 5,
  },
  {
    id: 4,
    product_name: 'Denim Jeans',
    product_img: 'shop-4',
    price: 50,
    ratings: 3.5,
  },
  {
    id: 5,
    product_name: 'Laced Boots',
    product_img: 'shop-5',
    price: 65,
    ratings: 6, // Test case for ratings greater than 5
  },
  {
    id: 6,
    product_name: 'Back pack',
    product_img: 'shop-6',
    price: 20,
    ratings: -1.3, // Test case for ratings less than 0
  },
];
