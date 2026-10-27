import { router } from "expo-router";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

export default function OrderSuccess() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/orderSuccessIllustration.png")}
          style={styles.orderSuccessIllustrationImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Thank you for your purchase. We have received your order and are
          preparing it for shipment.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/order-history" as any)} // Make sure this works in the combined app TO-DO
        >
          <Text style={styles.primaryButtonText}>View Order History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.replace("/" as any)} // Navigate to the home screen TO-DO
        >
          <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  orderSuccessIllustrationImage: {
    width: scale(220),
    height: scale(220),
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    fontSize: scale(20),
    fontWeight: "bold",
    color: "#111827",
    marginTop: scale(16),
  },
  subtitle: {
    textAlign: "center",
    fontSize: scale(14),
    color: "#94a3b8",
    marginTop: scale(8),
    paddingHorizontal: scale(10),
    lineHeight: scale(20),
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingBottom: scale(24),
    gap: scale(10),
  },
  primaryButton: {
    backgroundColor: "#3B49DF",
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  secondaryButtonText: {
    color: "#374151",
    fontSize: scale(15),
    fontWeight: "600",
  },
});
