import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";

const TrashCan = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Feather name="trash-2" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default TrashCan;

const styles = StyleSheet.create({
  container: {
    height: scale(32),
    width: scale(32),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },
});
