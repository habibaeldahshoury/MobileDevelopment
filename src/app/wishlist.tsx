import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";
import BackButton from "../components/BackButton";

const wishlist = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [productTitle, setProductTitle] = useState("Product Title");
  const [productDescription, setProductDescription] = useState(
    "Product Description",
  );
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

      <View style={[styles.productCard]}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
          }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={[styles.productTitle]}>{productTitle}</Text>
          <Text style={{ color: "#6B7280" }}>{productDescription}</Text>
          <Text style={[styles.productPrice]}>$100</Text>
        </View>
        <View style={{ paddingHorizontal: scale(10) }}>
          <Text style={{ color: "#6B7280" }}>Remove</Text>
        </View>
      </View>
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
  productCard: {
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
    fontSize: scale(18),
    fontWeight: "bold",
  },
});
