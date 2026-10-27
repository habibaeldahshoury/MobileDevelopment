import { View, Text, Pressable, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";

const tabs = [
  { label: "Home", emoji: "🏠", path: "/" },
  { label: "Wishlist", emoji: "❤️", path: "/wishlist" },
  { label: "Cart", emoji: "🛒", path: "/cart" },
  { label: "Profile", emoji: "👤", path: "/profile" },
];

export default function BottomBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 8 }]}>
      {tabs.map((tab) => {
        const otherPaths = ["/wishlist", "/cart", "/profile"];
        const active =
          tab.path === "/" ? !otherPaths.includes(pathname) : pathname === tab.path;

        return (
          <Pressable
            key={tab.label}
            onPress={() => router.replace(tab.path as any)}
            style={styles.item}
          >
            <Text style={[styles.emoji, { opacity: active ? 1 : 0.45 }]}>{tab.emoji}</Text>
            <Text
              style={[
                styles.label,
                { color: active ? colors.primary : colors.textSecondary },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 8,
  },
  item: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  emoji: {
    fontSize: 22,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});