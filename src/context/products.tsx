import { createContext, useContext, useState, type ReactNode } from "react";
import { PRODUCTS, type Product } from "../data/products";

type ProductsValue = {
  products: Product[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
};

// 1. create the context (the "shared box")
const ProductsContext = createContext<ProductsValue | null>(null);

// 2. the provider owns the state and wraps the whole app (see app/_layout.tsx)
export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products] = useState<Product[]>(PRODUCTS);
  // Default with ids '1' and '2' so you see items in wishlist right away
  const [wishlist, setWishlist] = useState<string[]>(["1", "2"]);

  const value: ProductsValue = {
    products,
    isWishlisted: (id) => wishlist.includes(id),
    toggleWishlist: (id) =>
      setWishlist((w) =>
        w.includes(id) ? w.filter((x) => x !== id) : [...w, id],
      ),
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
