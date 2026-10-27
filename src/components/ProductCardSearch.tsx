import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useProducts } from '@/context/products';
import type { Product } from '@/data/products';

export function ProductCard({ product }: { product: Product }) {
  const { isInCart, addToCart } = useProducts();
  const inCart = isInCart(product.id);

  return (
    <Pressable
      onPress={() => router.push({ pathname: '/productDetail/[id]', params: { id: product.id } })}
      className="gap-1 rounded-2xl border border-gray-200 bg-surface p-3.5 active:opacity-80">
      <View className="flex-row items-center gap-2">
        <Text numberOfLines={1} className="flex-1 text-[15px] font-bold text-foreground">
          {product.name}
        </Text>
        {product.oldPrice ? (
          <View className="rounded-full bg-accent px-2 py-0.5">
            <Text className="text-[10px] font-bold text-foreground">SALE</Text>
          </View>
        ) : null}
      </View>

      <Text className="text-[13px] text-muted">
        {product.category} · <Text className="font-semibold text-accent">★ {product.rating ?? "–"}</Text>
      </Text>

      <View className="flex-row items-center gap-2">
        <Text className="text-[15px] font-bold text-foreground">{product.price} EGP</Text>
        <Text className="flex-1 text-xs text-muted line-through">
          {product.oldPrice ? `${product.oldPrice} EGP` : ''}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Add ${product.name} to cart`}
          onPress={() => addToCart(product.id)}
          className="rounded-full bg-primary px-3.5 py-1.5 active:opacity-70">
          <Text className="text-xs font-bold text-white">{inCart ? 'Add more' : 'Add'}</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
