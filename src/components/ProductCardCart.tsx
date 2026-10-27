import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import type { Product } from "../data/products";

type ProductCardCartProps = {
  product: Product & { quantity: number };
  isWishlisted?: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onToggleWishlist?: () => void;
};

const ProductCardCart = ({
  product,
  isWishlisted,
  onIncrement,
  onDecrement,
  onRemove,
  onToggleWishlist,
}: ProductCardCartProps) => {
  return (
    <Link href={`/product/${product.id}` as any} asChild>
      <Pressable style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={{ color: "#6B7280" }}>
            {product.gender} | Size: {product.size}
          </Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          {product.discountPercent ? (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {product.discountPercent}% OFF
              </Text>
            </View>
          ) : null}

          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={(e) => {
                e.stopPropagation();
                onDecrement();
              }}
            >
              <FontAwesome name="minus" size={scale(11)} color="#4B5563" />
            </TouchableOpacity>

            <Text style={styles.stepperCount}>{product.quantity}</Text>

            <TouchableOpacity
              style={styles.stepperBtn}
              onPress={(e) => {
                e.stopPropagation();
                onIncrement();
              }}
            >
              <FontAwesome name="plus" size={scale(11)} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.rightActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              onToggleWishlist?.();
            }}
          >
            <FontAwesome
              name={isWishlisted ? "heart" : "heart-o"}
              size={scale(18)}
              color={isWishlisted ? "#4F46E5" : "#6B7280"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Feather name="trash-2" size={scale(18)} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Link>
  );
};

export default ProductCardCart;

const styles = StyleSheet.create({
  productCard: {
    position: "relative",
    flexDirection: "row",
    height: scale(145),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(14),
    marginHorizontal: scale(16),
    marginVertical: scale(4),
  },
  productImage: {
    width: scale(95),
    height: scale(115),
    margin: scale(10),
    borderRadius: scale(10),
    backgroundColor: "#F3F4F6",
  },
  productInfo: {
    flex: 1,
    height: scale(120),
    flexDirection: "column",
    paddingHorizontal: scale(6),
    justifyContent: "space-between",
    alignSelf: "center",
  },
  productTitle: {
    fontSize: scale(15),
    fontWeight: "bold",
    paddingRight: scale(35),
    color: "#111827",
  },
  productPrice: {
    fontSize: scale(15),
    fontWeight: "bold",
    color: "#111827",
  },
  discountBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(6),
    alignSelf: "flex-start",
    marginVertical: scale(4),
  },
  discountText: {
    color: "#D97706",
    fontSize: scale(10),
    fontWeight: "bold",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: scale(8),
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    alignSelf: "flex-start",
    gap: scale(10),
  },
  stepperBtn: {
    padding: scale(2),
  },
  stepperCount: {
    fontSize: scale(13),
    fontWeight: "bold",
    color: "#111827",
  },
  rightActions: {
    height: scale(120),
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: scale(14),
  },
  actionButton: {
    padding: scale(4),
  },
});
