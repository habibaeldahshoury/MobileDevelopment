import { StyleSheet } from "react-native";
import Cart from "./cart";

export default function Index() {
  return <Cart />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
