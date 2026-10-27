import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

type Props = {
  user: string;
  rating: number;
  comment: string;
};

export default function ReviewItem({ user, rating, comment }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.user}>{user}</Text>
        <Text style={styles.rating}>{rating}/5</Text>
      </View>
      <Text style={styles.comment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  user: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.text,
  },
  rating: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.accent,
  },
  comment: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
  },
});