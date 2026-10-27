import { createContext, useContext, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "../data/products";

type ProductsValue = {
  products: Product[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  cart: { id: string; quantity: number }[];
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

// 1. create the context (the "shared box")
const ProductsContext = createContext<ProductsValue | null>(null);

// 2. the provider owns the state and wraps the whole app (see app/_layout.tsx)
export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(PRODUCTS);
  const [wishlist, setWishlist] = useState<string[]>(["1", "2"]);

  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([
    { id: "1", quantity: 1 },
    { id: "2", quantity: 1 },
    { id: "3", quantity: 1 },
  ]);
  const incrementQuantity = (id: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  const decrementQuantity = (id: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const clearCart = () => {
    setCart([]);
  };

  const value: ProductsValue = {
    products,
    isWishlisted: (id) => wishlist.includes(id),
    toggleWishlist: (id) =>
      setWishlist((w) =>
        w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
      ),
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// 3. custom hook: any page calls useProducts() to read or change the shared state
export function useProducts() {
  const value = useContext(ProductsContext);
  if (!value)
    throw new Error("useProducts() must be used inside <ProductsProvider>");
  return value;
}

export default ProductsProvider;
