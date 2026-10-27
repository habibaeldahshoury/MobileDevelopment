import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

const Wishlisted = () => {
  const [isWishlisted, setIsWishlisted] = useState(true);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsWishlisted((current) => !current)}
    >
      <FontAwesome
        name={isWishlisted ? "heart" : "heart-o"}
        size={24}
        color="#4F46E5"
      />
    </TouchableOpacity>
  );
};

export default Wishlisted;

const styles = StyleSheet.create({
  container: {
    height: scale(32),
    width: scale(32),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});
