import BackButton from "@/components/BackButton";
import ReviewItem from "@/components/ReviewProduct";
import { useProducts } from "@/context/products";
import { reviews } from "@/data/reviews";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const productId = Array.isArray(id) ? id[0] : id;
  const { products, isWishlisted, toggleWishlist, isInCart, addToCart } = useProducts();
  const product = products.find((p) => p.id === productId);
  const [size, setSize] = useState(product?.sizes[0] ?? "");
  const [color, setColor] = useState(product?.colors[0] ?? "");

  if (!product) {
    return (
      <View className="flex-1 bg-background p-5">
        <BackButton fallback="/" />
        <Text className="p-6 text-center">Product not found</Text>
      </View>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const fav = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  return (
    <ScrollView className="flex-1 bg-background" contentContainerClassName="gap-2.5 p-5">
      <Stack.Screen options={{ title: product.name }} />
      <BackButton
        fallback={{ pathname: "/category/[id]", params: { id: product.categoryId } }}
      />
      <Image source={{ uri: product.image }} className="h-[380px] rounded-2xl bg-gray-200" />
      <Text className="text-2xl font-extrabold text-foreground">{product.name}</Text>
      <Text className="text-xl font-bold text-primary">{product.price} EGP</Text>
      <Text className="text-muted">{product.description}</Text>

      <Text className="mt-2.5 text-[17px] font-bold text-foreground">Size</Text>
      <View className="flex-row flex-wrap gap-2.5">
        {product.sizes.map((s) => (
          <Pressable
            key={s}
            className={`h-11 min-w-[48px] items-center justify-center rounded-xl border px-3 ${
              size === s ? "border-primary bg-primary" : "border-gray-300 bg-surface"
            }`}
            onPress={() => setSize(s)}
          >
            <Text className={`font-semibold ${size === s ? "text-white" : "text-foreground"}`}>{s}</Text>
          </Pressable>
        ))}
      </View>

      <Text className="mt-2.5 text-[17px] font-bold text-foreground">Color</Text>
      <View className="flex-row flex-wrap gap-2.5">
        {product.colors.map((c) => (
          <Pressable
            key={c}
            className={`h-[38px] w-[38px] rounded-full ${
              color === c ? "border-[3px] border-primary" : "border-2 border-gray-300"
            }`}
            style={{ backgroundColor: c }}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <Pressable
        className={`items-center rounded-xl border-[1.5px] border-primary p-3 ${fav ? "bg-primary" : ""}`}
        onPress={() => toggleWishlist(product.id)}
      >
        <Text className={`font-bold ${fav ? "text-white" : "text-primary"}`}>
          {fav ? "♥ Remove from favorites" : "♡ Add to favorites"}
        </Text>
      </Pressable>
      <Pressable
        className={`items-center rounded-xl border-[1.5px] border-primary p-3 ${inCart ? "bg-primary" : ""}`}
        onPress={() => (inCart ? router.push("/cart") : addToCart(product.id))}
      >
        <Text className={`font-bold ${inCart ? "text-white" : "text-primary"}`}>
          {inCart ? "✓ In cart · View cart" : "Add to cart"}
        </Text>
      </Pressable>

      <Text className="mt-2.5 text-[17px] font-bold text-foreground">Reviews</Text>
      {productReviews.slice(0, 2).map((r) => (
        <ReviewItem key={r.id} user={r.user} rating={r.rating} comment={r.comment} />
      ))}
      <Pressable onPress={() => router.push(`/reviews/${product.id}` as const)}>
        <Text className="p-2 text-center font-bold text-primary">Read more reviews →</Text>
      </Pressable>
    </ScrollView>
  );
}
