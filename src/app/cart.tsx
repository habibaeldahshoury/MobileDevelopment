import BackButton from "@/components/BackButton";
import ProductCardCart from "../components/ProductCardCart";
import { useProducts } from "../context/products";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Link } from "expo-router";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";

export default function CartScreen() {
  const {
    products,
    cart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    isWishlisted,
    toggleWishlist,
  } = useProducts();

  const cartItems = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as any[];

  //order summary calculations
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.oldPrice ?? item.price) * item.quantity,
    0,
  );

  const discount = cartItems.reduce((sum, item) => {
    if (!item.oldPrice) return sum;
    return sum + (item.oldPrice - item.price) * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? 5.0 : 0.0;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>My Cart</Text>
      </View>

      <Text style={styles.itemCount}>
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
      </Text>

      <FlatList
        data={cartItems}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <ProductCardCart
            product={item}
            isWishlisted={isWishlisted(item.id)}
            onIncrement={() => incrementQuantity(item.id)}
            onDecrement={() => decrementQuantity(item.id)}
            onRemove={() => removeFromCart(item.id)}
            onToggleWishlist={() => toggleWishlist(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: scale(20) }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <Image
              source={require("../../assets/images/noCartItemsIllustration.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.empty}>
              Add items to your cart to see them here.
            </Text>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

          <Link href="/checkout" asChild>
            <TouchableOpacity style={styles.checkoutButton}>
              <FontAwesome5
                name="shopping-basket"
                size={scale(16)}
                color="#FFFFFF"
              />
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    marginTop: scale(10),
    marginHorizontal: scale(10),
    paddingTop: scale(30),
  },
  title: {
    fontSize: scale(23),
    fontWeight: "bold",
    paddingHorizontal: scale(5),
  },
  itemCount: {
    color: "#6B7280",
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
  },
  empty: {
    textAlign: "center",
    color: "#94a3b8",
    marginTop: scale(5),
  },
  emptyImage: {
    width: scale(200),
    height: scale(200),
    alignSelf: "center",
    marginTop: scale(20),
  },
  emptyTitle: {
    textAlign: "center",
    fontSize: scale(18),
    fontWeight: "bold",
    marginTop: scale(10),
  },
  summaryContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
    paddingBottom: scale(24),
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(8),
  },
  summaryLabel: {
    fontSize: scale(14),
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#111827",
  },
  discountValue: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#16A34A",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: scale(10),
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(14),
  },
  totalLabel: {
    fontSize: scale(18),
    fontWeight: "bold",
    color: "#111827",
  },
  totalValue: {
    fontSize: scale(20),
    fontWeight: "bold",
    color: "#111827",
  },
  checkoutButton: {
    backgroundColor: "#3B49DF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(14),
    borderRadius: scale(12),
    gap: scale(8),
  },
  checkoutText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
