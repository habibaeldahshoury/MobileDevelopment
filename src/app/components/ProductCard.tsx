import { Pressable, Text, Image, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

type Props = {
  name: string;
  price: number;
  image: string;
  onPress: () => void;
};

export default function ProductCard({ name, price, image, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}
    >
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.price}>{price} EGP</Text>
      <Image source={{ uri: image }} style={styles.image} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
    marginTop: 2,
  },
  image: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginTop: 10,
    backgroundColor: "#E5E7EB",
  },
});