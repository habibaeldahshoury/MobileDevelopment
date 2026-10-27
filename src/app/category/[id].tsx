import { FlatList, Text, View } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "@/data/categories";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const categoryId = Array.isArray(id) ? id[0] : id;
  const category = CATEGORIES.find((item) => item.id === categoryId);
  const categoryProducts = products.filter((item) => item.categoryId === categoryId);

  if (!category) {
    return (
      <View className="flex-1 bg-background px-4">
        <BackButton label="Categories" fallback="/categories" />
        <View className="flex-1 items-center justify-center">
          <Text className="text-center text-base text-muted">Category not found</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: category.title, headerShown: true }} />
      <FlatList
        data={categoryProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        className="flex-1 bg-background"
        columnWrapperClassName="mb-3 gap-3"
        contentContainerClassName="p-4 pb-10"
        ListHeaderComponent={
          <View className="mb-4">
            <BackButton label="Categories" fallback="/categories" />
            <Text className="text-[28px] font-extrabold text-foreground">{category.title}</Text>
          </View>
        }
        ListEmptyComponent={
          <Text className="text-center text-base text-muted">No products available</Text>
        }
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            oldPrice={item.oldPrice}
            image={item.image}
            onPress={() => router.push({ pathname: "/productDetail/[id]", params: { id: item.id } })}
          />
        )}
      />
    </>
  );
}
