import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import BackButton from "../components/BackButton";
import ProductCardWishlist from "../components/ProductCardWishlist";

const wishlist = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [productTitle, setProductTitle] = useState("Product Title");
  const [productDescription, setProductDescription] = useState(
    "Product Description",
  );
  const [productPrice, setProductPrice] = useState(100);
  const [productImage, setProductImage] = useState(
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  );
  const [isWishlist, setIsWishlist] = useState(true);
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            marginTop: scale(20),
            marginHorizontal: scale(10),
          },
        ]}
      >
        <BackButton />
        <Text style={[styles.text, { paddingHorizontal: scale(5) }]}>
          My Wishlist
        </Text>
      </View>
      <Text
        style={[
          {
            color: "#6B7280",
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
          },
        ]}
      >
        {totalItems} items
      </Text>

      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
      <ProductCardWishlist
        productTitle={productTitle}
        productDescription={productDescription}
        productPrice={productPrice}
        productImage={productImage}
      />
    </View>
  );
};

export default wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  text: {
    fontSize: scale(23),
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
  },
});
