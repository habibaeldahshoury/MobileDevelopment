import Feather from "@expo/vector-icons/Feather";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

export type DeliveryAddress = {
  name: string;
  street: string;
  city: string;
};

type AddressCardProps = {
  address: DeliveryAddress | null;
  onSelectAddress: () => void;
  error?: string;
};

export default function AddressCard({
  address,
  onSelectAddress,
  error,
}: AddressCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Delivery Address</Text>
      <TouchableOpacity
        style={[styles.card, error ? styles.cardError : null]}
        onPress={onSelectAddress}
      >
        <View style={styles.iconCircle}>
          <Feather name="map-pin" size={scale(18)} color="#4F46E5" />
        </View>

        <View style={styles.addressInfo}>
          {address ? (
            <>
              <Text style={styles.addressName}>{address.name}</Text>
              <Text style={styles.addressStreet}>
                {address.street}, {address.city}
              </Text>
            </>
          ) : (
            <Text style={styles.addressPlaceholder}>
              Tap to select your delivery location
            </Text>
          )}
        </View>

        <Feather name="chevron-right" size={scale(20)} color="#9CA3AF" />
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: scale(14),
    padding: scale(14),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardError: {
    borderColor: "#EF4444",
  },
  iconCircle: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    //backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(12),
  },
  addressInfo: {
    flex: 1,
  },
  addressName: {
    fontSize: scale(15),
    fontWeight: "bold",
    color: "#111827",
  },
  addressStreet: {
    fontSize: scale(13),
    color: "#6B7280",
    marginTop: scale(2),
  },
  addressPlaceholder: {
    fontSize: scale(14),
    color: "#9CA3AF",
  },
  errorText: {
    color: "#EF4444",
    fontSize: scale(11),
    marginTop: scale(4),
  },
});
