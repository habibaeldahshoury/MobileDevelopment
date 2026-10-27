import BackButton from "@/components/BackButton";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { scale } from "react-native-size-matters";

export default function SelectAddress() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />

      <SafeAreaView style={styles.headerContainer} pointerEvents="box-none">
        <View style={styles.backButtonCircle}>
          <BackButton />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: scale(30),
    paddingHorizontal: scale(14),
  },
  backButtonCircle: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
