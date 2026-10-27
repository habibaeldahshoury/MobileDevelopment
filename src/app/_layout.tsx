import { View } from "react-native";
import { Stack } from "expo-router";
import { colors } from "@/constants/colors";
import BottomBar from "@/components/BottomBar";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Categories" }} />
        <Stack.Screen name="wishlist" options={{ title: "Wishlist" }} />
        <Stack.Screen name="cart" options={{ title: "Cart" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>
      <BottomBar />
    </View>
  );
}