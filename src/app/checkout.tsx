import BackButton from "@/components/BackButton";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>Checkout</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Checkout Screen</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(20),
    marginHorizontal: scale(10),
    paddingTop: scale(30),
    gap: scale(10),
  },
  title: {
    fontSize: scale(23),
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: scale(16),
    color: "#6B7280",
  },
});
