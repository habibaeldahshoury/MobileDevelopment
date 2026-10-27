import { ScrollView, Text } from "react-native";
import { router } from "expo-router";
import { CATEGORIES } from "@/data/categories";
import CategoryCard from "@/components/CategoryCard";

export default function CategoriesScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-3.5 px-5 pb-8"
      showsVerticalScrollIndicator={false}
    >
      <Text className="mb-1 text-[26px] font-bold tracking-tight text-foreground">Categories</Text>

      {CATEGORIES.map((item) => (
        <CategoryCard
          key={item.id}
          title={item.title}
          color={item.color}
          emoji={item.emoji}
          onPress={() => router.push({ pathname: "/category/[id]", params: { id: item.id } })}
        />
      ))}
    </ScrollView>
  );
}
