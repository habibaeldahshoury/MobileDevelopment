export type Product = {
  id: string;
  categoryId: string;
  category: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  image: string;
  description?: string;
  sizes: string[];
  colors: string[];
};

export const products: Product[] = [
  {
    id: "p1",
    categoryId: "1",
    category: "T-Shirts",
    name: "Basic T-Shirt",
    price: 250,
    oldPrice: 300,
    rating: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Zdui12TFoWGo3R3fzXadR1q_P8ZxC6uBs5lh4AMAYA&s=10",
    description: "Soft cotton t-shirt with a relaxed fit.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#111827", "#4F46E5"],
  },
  {
    id: "p2",
    categoryId: "1",
    category: "Jeans",
    name: "Blue Jeans",
    price: 600,
    oldPrice: 750,
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQ9qyUfmUXCKiOTgzzyZLDOMn3wwAaRaOUE0VVuhzLg&s=10",
    description: "Stretch denim with a slim fit.",
    sizes: ["M", "L", "XL"],
    colors: ["#1E3A8A", "#111827"],
  },
  {
    id: "p3",
    categoryId: "2",
    category: "Dresses",
    name: "Floral Summer Dress",
    price: 750,
    oldPrice: 950,
    rating: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTssUiXXmFpGxaTpoduvFukSvc5Cib4W8TondN016OBWQ&s=10",
    description: "Light and breezy dress for warm days.",
    sizes: ["S", "M", "L"],
    colors: ["#F9A8D4", "#FDE68A", "#FFFFFF"],
  },
  {
    id: "p4",
    categoryId: "2",
    category: "Jackets",
    name: "Classic Denim Jacket",
    price: 900,
    oldPrice: 1100,
    rating: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLdL-pZsjIQuZRHrQchuA4o2NWK9mY1TDfQOZIllSKFw&s=10",
    description: "A timeless jacket that goes with everything.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#60A5FA", "#111827"],
  },
  {
    id: "p5",
    categoryId: "3",
    category: "Hoodies",
    name: "Kids Cartoon Hoodie",
    price: 350,
    rating: 4.5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYNe4fgqP-1jTiXJ5kbvx76Vci5cvxkQnSGOJmtvvCBQ&s=10",
    description: "Warm and cozy hoodie with a fun print.",
    sizes: ["S", "M", "L"],
    colors: ["#F59E0B", "#4F46E5", "#10B981"],
  },
  {
    id: "p6",
    categoryId: "3",
    category: "Shorts",
    name: "Kids Sport Shorts",
    price: 200,
    rating: 3.5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM97KZrAJiDQ6VKm6HOyeG72MPgxzmJOqR8M2yTkq8TQ&s",
    description: "Comfortable shorts for playing outside.",
    sizes: ["S", "M"],
    colors: ["#111827", "#EF4444"],
  },
  {
    id: "p7",
    categoryId: "1",
    category: "Shoes",
    name: "Shoes",
    price: 530,
    rating: 3,
    image: "",
    description: "Everyday shoes for a casual look.",
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["#111827", "#FFFFFF"],
  },
  {
    id: "p8",
    categoryId: "2",
    category: "Jackets",
    name: "Casual Denim Jacket",
    price: 71.99,
    oldPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    sizes: ["M"],
    colors: ["#92400E"],
  },
  {
    id: "p9",
    categoryId: "1",
    category: "Hoodies",
    name: "Classic Cotton Hoodie",
    price: 50.99,
    oldPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=1372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    sizes: ["L"],
    colors: ["#6B7280"],
  },
  {
    id: "p10",
    categoryId: "1",
    category: "Pants",
    name: "Slim Fit Chinos",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1518292309104-b0ee1cfba4cc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    sizes: ["L"],
    colors: [],
  },
  {
    id: "p11",
    categoryId: "1",
    category: "Shoes",
    name: "Running Sneakers",
    price: 120.0,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    sizes: ["42"],
    colors: [],
  },
];
