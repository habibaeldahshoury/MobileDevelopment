import { ScrollView, Text, View } from 'react-native';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export default function HomeScreen() {
  const onSale = products.filter(product => product.oldPrice);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-3 px-5 pb-8"
      showsVerticalScrollIndicator={false}>
      <View className="mb-1">
        <Text className="text-[26px] font-bold tracking-tight text-foreground">Shop</Text>
        <Text className="mt-1 text-sm text-muted">
          {products.length} items · {onSale.length} on sale
        </Text>
      </View>

      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
}
