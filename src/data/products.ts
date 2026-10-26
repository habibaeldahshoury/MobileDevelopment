export type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: number;
};

export const products: Product[] = [
  { id: '1', name: 'Oversized T-Shirts', category: 'T-Shirts', price: '240 EGP', oldPrice: '300 EGP', rating: 3 },
  { id: '2', name: 'Summer Dress', category: 'Dresses', price: '49.99 EGP', oldPrice: '69.99 EGP', rating: 4 },
  { id: '3', name: 'Jacket', category: 'Jackets', price: '69 EGP', oldPrice: '89 EGP', rating: 4 },
  { id: '4', name: 'Oversize Jeans', category: 'Jeans', price: '455 EGP', oldPrice: '599 EGP', rating: 5 },
  { id: '5', name: 'Shoes', category: 'Shoes', price: '530 EGP', rating: 3 },
];
