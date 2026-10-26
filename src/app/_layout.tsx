import { Stack } from "expo-router";
import { ProductsProvider } from "../context/products";

export default function RootLayout() {
  return (
    <ProductsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ProductsProvider>
  );
}
