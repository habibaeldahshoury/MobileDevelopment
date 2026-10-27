import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { CATEGORIES } from "@/app/data/categories";
import { colors } from "@/constants/colors";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Categories</Text>

      <View style={styles.list}>
        {CATEGORIES.map((item: { id: string; title: string; color: string; img: string; emoji: string }) => (
          <CategoryCard
            key={item.id}
            title={item.title}
            color={item.color}
            img={item.img}
            onPress={() => router.push(`/category/${item.id}` as const)}
            emoji={item.emoji}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.text,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  list: {
    flex: 1,
    padding: 16,
    gap: 14,
  },
});