import { StyleSheet } from "react-native";
import Cart from "./cart";

export default function Index() {
  return <Cart />;
}

/*<View style={styles.container}>
      
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
</View>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
