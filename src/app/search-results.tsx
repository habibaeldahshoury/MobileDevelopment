import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Opened from the search bar in the root layout with the text in `?q=`.
export default function SearchResultsScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  const query = (q ?? '').trim();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const visibleProducts = terms.length
    ? products.filter(product => {
        const name = normalizeText(product.name);
        return terms.every(term => name.includes(normalizeText(term)));
      })
    : products;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-3 px-5 pb-8"
      showsVerticalScrollIndicator={false}>
      <View className="mb-1">
        <Text className="text-[26px] font-bold tracking-tight text-foreground">Search results</Text>
        <Text className="mt-1 text-sm text-muted">
          {query
            ? `${visibleProducts.length} ${visibleProducts.length === 1 ? 'result' : 'results'} for "${query}"`
            : `Clothes · ${products.length} items`}
        </Text>
      </View>

      {visibleProducts.length === 0 ? (
        <View className="items-center gap-1.5 rounded-2xl border border-gray-200 bg-surface px-5 py-10">
          <Text className="text-base font-semibold text-foreground">No clothes found</Text>
          <Text className="text-center text-[13px] text-muted">Try a different name.</Text>
        </View>
      ) : (
        visibleProducts.map(product => <ProductCard key={product.id} product={product} />)
      )}
    </ScrollView>
  );
}
