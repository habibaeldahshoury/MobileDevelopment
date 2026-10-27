import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { colors } from "@/constants/colors";

type Props = {
  title: string;
  color: string;
  img: string;
  emoji: string;
  onPress: () => void;
};

export default function CategoryCard({ title, color, img, emoji, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, { backgroundColor: color }, pressed && styles.pressed]}
    >
      <View style={styles.row}>
        <View>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        {img ? (
          <Image
            source={{ uri: `https://images.unsplash.com/${img}` }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    minHeight: 120,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  emoji: {
    fontSize: 30,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.surface,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
});
