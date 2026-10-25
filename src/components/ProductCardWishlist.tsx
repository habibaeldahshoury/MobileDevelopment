import Rating from "@/components/Rating";
import Wishlisted from "@/components/Wishlisted";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

type ProductCardWishlistProps = {
  productTitle: string;
  productDescription: string;
  productPrice: number;
  productImage: string;
};

const ProductCardWishlist = ({
  productTitle,
  productDescription,
  productPrice,
  productImage,
}: ProductCardWishlistProps) => {
  return (
    <View style={[styles.productCard]}>
      <Image source={{ uri: productImage }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={[styles.productTitle]}>{productTitle}</Text>
        <Text style={{ color: "#6B7280" }}>{productDescription}</Text>
        <Text style={[styles.productPrice]}>${productPrice.toFixed(2)}</Text>
        <Rating />
      </View>
      <View style={{ paddingHorizontal: scale(10) }}>
        <View style={styles.wishlistButton}>
          <Wishlisted />
        </View>
      </View>
    </View>
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
  },
  productImage: {
    width: scale(100),
    height: scale(100),
    margin: scale(10),
    borderRadius: scale(10),
  },
  productInfo: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: scale(10),
  },
  productTitle: {
    fontSize: scale(16),
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: scale(16),
    fontWeight: "bold",
  },
  wishlistButton: {
    position: "absolute",
    right: scale(5),
    bottom: scale(10),
    borderRadius: scale(10),
    padding: scale(10),
  },
});
