import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-size-matters";

type CheckoutBottomBarProps = {
  totalAmount: number;
  disabled: boolean;
  onPlaceOrder: () => void;
};

export default function CheckoutBottomBar({
  totalAmount,
  disabled,
  onPlaceOrder,
}: CheckoutBottomBarProps) {
  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={[
          styles.placeOrderButton,
          disabled ? styles.disabledButton : null,
        ]}
        onPress={onPlaceOrder}
        disabled={disabled}
      >
        <Text style={styles.placeOrderText}>
          {disabled
            ? "Cart is Empty"
            : `Place Order • $${totalAmount.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: scale(16),
    paddingTop: scale(12),
    paddingBottom: scale(20),
  },
  placeOrderButton: {
    backgroundColor: "#3B49DF",
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
