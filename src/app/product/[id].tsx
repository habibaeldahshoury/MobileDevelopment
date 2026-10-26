import BackButton from "@/components/BackButton";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

export default function ProductDetails() {
  // This is a placeholder for the product details page. Replace it with the actual product details when it's ready :3 ✨
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <BackButton />
      <Text>Product Details (Placeholder)</Text>
      <Text>Product ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: scale(50),
    backgroundColor: "#F9FAFB",
  },
});
