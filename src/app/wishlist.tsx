import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import BackButton from "../components/BackButton";
import ProductCardWishlist from "../components/ProductCardWishlist";
import { useProducts } from "../context/products";

export default function WishlistScreen() {
  const { products, isWishlisted, toggleWishlist } = useProducts();
  const wishlist = products.filter((p) => isWishlisted(p.id));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.title}>My Wishlist</Text>
      </View>

      <Text style={styles.itemCount}>
        {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
      </Text>

      <FlatList
        data={wishlist}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <ProductCardWishlist
            product={item}
            onToggleWishlist={() => toggleWishlist(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: scale(20) }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View>
            <Image
              source={require("../../assets/images/noWishlistsIllustration.png")}
              style={styles.emptyImage}
            />
            <Text style={styles.emptyTitle}>No wishlists yet</Text>
            <Text style={styles.empty}>
              Save the things you love and find them here later.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: scale(23),
    fontWeight: "bold",
    paddingHorizontal: scale(5),
  },
  header: {
    flexDirection: "row",
    marginTop: scale(10),
    marginHorizontal: scale(10),
    paddingTop: scale(30),
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
});
