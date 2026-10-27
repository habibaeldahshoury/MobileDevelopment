import BackButton from "@/components/BackButton";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Region } from "react-native-maps";
import { scale } from "react-native-size-matters";

const INITIAL_REGION: Region = {
  latitude: 30.0444,
  longitude: 31.2357,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export default function SelectAddress() {
  const [region, setRegion] = useState<Region>(INITIAL_REGION);

  const handleConfirmLocation = () => {
    router.navigate({
      pathname: "/checkout",
      params: {
        street: `Pin (${region.latitude.toFixed(4)}, ${region.longitude.toFixed(4)})`,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        onRegionChangeComplete={(currentRegion) => setRegion(currentRegion)}
      />

      <View style={styles.pinContainer} pointerEvents="none">
        <Entypo name="location-pin" size={scale(36)} color="#3B49DF" />
      </View>

      <SafeAreaView style={styles.headerContainer} pointerEvents="box-none">
        <View style={styles.backButtonCircle}>
          <BackButton />
        </View>
      </SafeAreaView>

      <View style={styles.bottomCard}>
        <View style={styles.addressInfo}>
          <View style={styles.pinCircle}>
            <Feather name="map-pin" size={scale(18)} color="#4F46E5" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.locationTitle}>Selected Location</Text>
            <Text style={styles.locationCoords}>
              {region.latitude.toFixed(4)}, {region.longitude.toFixed(4)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  pinContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
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
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingTop: scale(18),
    paddingBottom: scale(26),
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(16),
  },
  pinCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  textContainer: {
    flex: 1,
  },
  locationTitle: {
    fontSize: scale(15),
    fontWeight: "bold",
    color: "#111827",
  },
  locationCoords: {
    fontSize: scale(13),
    color: "#6B7280",
    marginTop: scale(2),
  },
  confirmButton: {
    backgroundColor: "#3B49DF",
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: scale(15),
    fontWeight: "bold",
  },
});
