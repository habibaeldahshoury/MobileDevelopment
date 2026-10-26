import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

const BackButton = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.back()}>
      <Entypo name="chevron-left" size={scale(25)} color="black" />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    height: scale(32),
    width: scale(32),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});
