import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

const Rating = () => {
  const [rating, setRating] = useState(4.5);
  return (
    <View style={styles.container}>
      <FontAwesome name="star" size={24} color="#F59E0B" />
      <Text
        style={{
          color: "#6B7280",
          fontWeight: "bold",
          paddingHorizontal: scale(5),
        }}
      >
        {rating.toFixed(1)}
      </Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: scale(3),
  },
});
