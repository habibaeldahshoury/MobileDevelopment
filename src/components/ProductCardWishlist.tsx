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
import Rating from "../components/Rating";
import type { Product } from "../data/products";

type ProductCardWishlistProps = {
  product: Product;
  onToggleWishlist?: () => void;
};

const ProductCardWishlist = ({
  product,
  onToggleWishlist,
}: ProductCardWishlistProps) => {
  return (
    <Link href={{ pathname: "/productDetail/[id]", params: { id: product.id } }} asChild>
      <Pressable style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={{ color: "#6B7280" }}>{product.category}</Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
          <Rating />
        </View>
        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={(e) => {
            e.stopPropagation();
            onToggleWishlist?.();
          }}
        >
          <FontAwesome name="heart" size={24} color="#4F46E5" />
        </TouchableOpacity>
      </Pressable>
    </Link>
  );
};

export default ProductCardWishlist;

const styles = StyleSheet.create({
  productCard: {
    position: "relative",
    flexDirection: "row",
    height: scale(120),
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(10),
    marginHorizontal: scale(20),
    marginVertical: scale(4),
  },
  productImage: {
    width: scale(100),
    height: scale(100),
    margin: scale(10),
    borderRadius: scale(10),
  },
  productInfo: {
    flex: 1,
    height: scale(100),
    flexDirection: "column",
    paddingHorizontal: scale(10),
    justifyContent: "space-between",
    alignSelf: "center",
  },
  productTitle: {
    fontSize: scale(16),
    fontWeight: "bold",
    paddingRight: scale(35),
  },
  productPrice: {
    fontSize: scale(16),
    fontWeight: "bold",
  },
  wishlistButton: {
    position: "absolute",
    top: scale(5),
    right: scale(10),
    padding: scale(10),
  },
});
