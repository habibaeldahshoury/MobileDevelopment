export type ProductGender = "Unisex" | "Women" | "Men";

export type Product = {
  id: string;
  title: string;
  gender: ProductGender;
  size: string;
  price: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Casual Denim Jacket",
    gender: "Women",
    size: "M",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: "2",
    title: "Classic Cotton Hoodie",
    gender: "Unisex",
    size: "L",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: "3",
    title: "Slim Fit Chinos",
    gender: "Men",
    size: "L",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1518292309104-b0ee1cfba4cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: "4",
    title: "Running Sneakers",
    gender: "Unisex",
    size: "42",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
];
