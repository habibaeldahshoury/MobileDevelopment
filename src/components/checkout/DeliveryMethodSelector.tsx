import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

export type DeliveryMethod = "standard" | "express";

type DeliveryMethodSelectorProps = {
  selectedMethod: DeliveryMethod;
  onSelectMethod: (method: DeliveryMethod) => void;
};

export default function DeliveryMethodSelector({
  selectedMethod,
  onSelectMethod,
}: DeliveryMethodSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Delivery Method</Text>
      <View style={styles.cardGroup}>
        <TouchableOpacity
          style={[
            styles.methodRow,
            selectedMethod === "standard" ? styles.rowSelected : null,
          ]}
          onPress={() => onSelectMethod("standard")}
        >
          <FontAwesome
            name={selectedMethod === "standard" ? "dot-circle-o" : "circle-o"}
            size={scale(18)}
            color={selectedMethod === "standard" ? "#4F46E5" : "#9CA3AF"}
          />
          <Feather
            name="truck"
            size={scale(18)}
            color="#4B5563"
            style={styles.methodIcon}
          />
          <View style={styles.methodDetails}>
            <Text style={styles.methodTitle}>Standard Delivery</Text>
            <Text style={styles.methodSubtitle}>3 - 5 business days</Text>
          </View>
          <Text style={styles.methodPrice}>$5.00</Text>
        </TouchableOpacity>

        <View style={styles.innerDivider} />

        <TouchableOpacity
          style={[
            styles.methodRow,
            selectedMethod === "express" ? styles.rowSelected : null,
          ]}
          onPress={() => onSelectMethod("express")}
        >
          <FontAwesome
            name={selectedMethod === "express" ? "dot-circle-o" : "circle-o"}
            size={scale(18)}
            color={selectedMethod === "express" ? "#4F46E5" : "#9CA3AF"}
          />
          <Feather
            name="zap"
            size={scale(18)}
            color="#F59E0B"
            style={styles.methodIcon}
          />
          <View style={styles.methodDetails}>
            <Text style={styles.methodTitle}>Express Delivery</Text>
            <Text style={styles.methodSubtitle}>1 - 2 business days</Text>
          </View>
          <Text style={styles.methodPrice}>$12.00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(14),
  },
  sectionTitle: {
    fontSize: scale(15),
    fontWeight: "bold",
    color: "#111827",
    marginBottom: scale(8),
  },
  cardGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: scale(14),
  },
  rowSelected: {
    backgroundColor: "#FAF5FF",
  },
  methodIcon: {
    marginLeft: scale(12),
    marginRight: scale(10),
  },
  methodDetails: {
    flex: 1,
  },
  methodTitle: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#111827",
  },
  methodSubtitle: {
    fontSize: scale(12),
    color: "#6B7280",
    marginTop: scale(2),
  },
  methodPrice: {
    fontSize: scale(14),
    fontWeight: "bold",
    color: "#111827",
  },
  innerDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
});
