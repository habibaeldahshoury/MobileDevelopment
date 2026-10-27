import { FlatList, Text, View, StyleSheet } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { CATEGORIES } from "../data/categories";
import { products } from "../data/products";
import { colors } from "../constants/colors";
import ProductCard from "../components/ProductCard";

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const categoryId = Array.isArray(id) ? id[0] : id;
  const category = CATEGORIES.find((item) => item.id === categoryId);
  const categoryProducts = products.filter((item) => item.categoryId === categoryId);

  if (!category) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Category not found</Text>
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
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        style={styles.container}
        ListHeaderComponent={<Text style={styles.heading}>{category.title}</Text>}
        ListEmptyComponent={<Text style={styles.emptyText}>No products available</Text>}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            image={item.image}
            onPress={() => router.push({ pathname: "/productDetail/[id]", params: { id: item.id } })}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 40 },
  row: { gap: 12, marginBottom: 12 },
  heading: { fontSize: 28, fontWeight: "800", color: colors.text, marginBottom: 16 },
  empty: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.background },
  emptyText: { color: colors.textSecondary, fontSize: 16, textAlign: "center" },
});

