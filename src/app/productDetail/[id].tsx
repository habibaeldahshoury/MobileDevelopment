import ReviewItem from "@/components/ReviewProduct";
import { colors } from "@/constants/colors";
import { products } from "@/app/data/products";
import { reviews } from "@/app/data/reviews";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const productId = Array.isArray(id) ? id[0] : id;
  const product = products.find((p) => p.id === productId);
  const [fav, setFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "");

  if (!product) return <Text style={styles.missing}>Product not found</Text>;

  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Stack.Screen options={{ title: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price} EGP</Text>
      <Text style={styles.desc}>{product.description}</Text>

      <Text style={styles.h}>Size</Text>
      <View style={styles.row}>
        {product.sizes.map((s) => (
          <Pressable key={s} style={[styles.sizeBox, size === s && styles.sizeOn]} onPress={() => setSize(s)}>
            <Text style={[styles.sizeText, size === s && styles.sizeTextOn]}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.h}>Color</Text>
      <View style={styles.row}>
        {product.colors.map((c) => (
          <Pressable
            key={c}
            style={[styles.circle, { backgroundColor: c }, color === c && styles.circleOn]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <Pressable style={[styles.btn, fav && styles.btnOn]} onPress={() => setFav(!fav)}>
        <Text style={[styles.btnText, fav && styles.btnTextOn]}>{fav ? "♥ Remove from favorites" : "♡ Add to favorites"}</Text>
      </Pressable>
      <Pressable style={[styles.btn, inCart && styles.btnOn]} onPress={() => setInCart(!inCart)}>
        <Text style={[styles.btnText, inCart && styles.btnTextOn]}>{inCart ? "✓ Added to cart" : "Add to cart"}</Text>
      </Pressable>

      <Text style={styles.h}>Reviews</Text>
      {productReviews.slice(0, 2).map((r) => (
        <ReviewItem key={r.id} user={r.user} rating={r.rating} comment={r.comment} />
      ))}
      <Pressable onPress={() => router.push(`/reviews/${product.id}` as const)}>
        <Text style={styles.link}>Read more reviews →</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { padding: 20, gap: 10, backgroundColor: colors.background },
  missing: { padding: 24, textAlign: "center" },
  image: { height: 380, borderRadius: 16, backgroundColor: "#E5E7EB" },
  title: { fontSize: 24, fontWeight: "800", color: colors.text },
  price: { fontSize: 20, fontWeight: "700", color: colors.primary },
  desc: { color: colors.textSecondary },
  btn: { padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: colors.primary, alignItems: "center" },
  btnOn: { backgroundColor: colors.primary },
  btnText: { color: colors.primary, fontWeight: "700" },
  btnTextOn: { color: colors.surface },
  h: { fontSize: 17, fontWeight: "700", color: colors.text, marginTop: 10 },
  link: { color: colors.primary, fontWeight: "700", textAlign: "center", padding: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  sizeBox: {
    minWidth: 48,
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  sizeText: { fontWeight: "600", color: colors.text },
  sizeTextOn: { color: colors.surface },
  circle: { width: 38, height: 38, borderRadius: 19, borderWidth: 2, borderColor: "#D1D5DB" },
  circleOn: { borderWidth: 3, borderColor: colors.primary },
});