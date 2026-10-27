import { View, Text, Pressable } from "react-native";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
    <View
      className="flex-row border-t border-gray-200 bg-surface pt-2"
      style={{ paddingBottom: insets.bottom + 8 }}
    >
      {tabs.map((tab) => {
        const otherPaths = ["/wishlist", "/cart", "/profile"];
        const active =
          tab.path === "/" ? !otherPaths.includes(pathname) : pathname === tab.path;

        return (
          <Pressable
            key={tab.label}
            onPress={() => router.replace(tab.path as any)}
            className="flex-1 items-center gap-0.5"
          >
            <Text className={`text-[22px] ${active ? "opacity-100" : "opacity-[.45]"}`}>{tab.emoji}</Text>
            <Text className={`text-xs font-semibold ${active ? "text-primary" : "text-muted"}`}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
