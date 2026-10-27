import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function HomeScreen() {
  const onSale = products.filter(product => product.oldPrice);

  return (
    <FlatList
      data={products}
      keyExtractor={product => product.id}
      numColumns={2}
      className="flex-1 bg-background"
      columnWrapperClassName="mb-3 gap-3"
      contentContainerClassName="px-5 pb-8"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View className="mb-4">
          <Text className="text-[26px] font-bold tracking-tight text-foreground">Shop</Text>
          <Text className="mt-1 text-sm text-muted">
            {products.length} items · {onSale.length} on sale
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ProductCard
          name={item.name}
          price={item.price}
          oldPrice={item.oldPrice}
          image={item.image}
          onPress={() => router.push({ pathname: '/productDetail/[id]', params: { id: item.id } })}
        />
      )}
    />
  );
}
