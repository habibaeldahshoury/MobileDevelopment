import { StyleSheet } from "react-native";
import Wishlist from "./wishlist";

export default function Index() {
  return <Wishlist />;
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
