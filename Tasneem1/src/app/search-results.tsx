import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Palette } from '@/constants/palette';


const products = [{
id: '1',
name: 'Oversized T-Shirts',
category: 'T-Shirts',
price: '240Egp',
oldPrice: '300Egp',
rating: '3',
  },
  {
id: '2',
name: 'Summer Dress',
category: 'Dresses',
price: '49.99Egp',
oldPrice: '69.99Egp',
rating: '4',
  },
  {
    id: '3',
    name: 'Jacket',
    category: 'Jackets',
    price: '69Egp',
    oldPrice: '89Egp',
    rating: '4',
  },
  {
    id: '4',
    name: 'Oversize Jeans',
    category: 'Jeans',
    price: '455Egp',
    oldPrice: '599Egp',
    rating: '5',
  },
  {
    id: '5',
    name: 'Shoes',
    category: 'Shoes',
    price: '530Egp',
    rating: '3',
  },
];

function normalizeText(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export default function SearchResultsScreen() {
  const [query, setQuery] = useState('');
  const trimmedQuery = query.trim();
  const terms = trimmedQuery
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  const visibleProducts = terms.length
    ? products.filter((product) => {
        const name = normalizeText(product.name);
        return terms.every((term) => name.includes(normalizeText(term)));
      })
    : products;

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[styles.content, Platform.OS === 'web' && styles.contentWeb]}>
        <View style={styles.header}>
          <Text style={styles.title}>Search Results</Text>
          <Text style={styles.subtitle}>
            {trimmedQuery
              ? `${visibleProducts.length} ${
                  visibleProducts.length === 1 ? 'result' : 'results'
                } for "${trimmedQuery}"`
              : `Clothes - ${products.length} items`}
          </Text>
        </View>

        <View style={styles.searchBar}>
          <SymbolView
            name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
            size={18}
            tintColor={Palette.textSecondary}
          />

          <TextInput
            accessibilityLabel="Search clothes by name"
            placeholder="Search by name"
            placeholderTextColor={Palette.textSecondary}
            value={query}
            onChangeText={setQuery}
            style={styles.searchInput}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />

          {query.length > 0 ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              onPress={() => setQuery('')}
              style={({ pressed }) => [styles.clearButton, pressed && styles.pressed]}>
              <SymbolView
                name={{ ios: 'xmark', android: 'close', web: 'close' }}
                size={14}
                tintColor={Palette.textSecondary}
              />
            </Pressable>
          ) : null}
        </View>

        {visibleProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No clothes found</Text>
            <Text style={styles.emptyText}>Try a different name.</Text>
          </View>
        ) : (
          visibleProducts.map((product) => (
            <View key={product.id} style={styles.cardWrapper}>
              <View style={styles.card}>
                <View style={styles.nameRow}>
                  <Text numberOfLines={1} style={styles.cardTitle}>
                    {product.name}
                  </Text>

                  {product.oldPrice ? (
                    <View style={styles.saleBadge}>
                      <Text style={styles.saleText}>SALE</Text>
                    </View>
                  ) : null}
                </View>

                <Text style={styles.cardCategory}>
                  {product.category} - <Text style={styles.rating}>{product.rating}</Text>
                </Text>

                <View style={styles.priceRow}>
                  <Text style={styles.cardPrice}>{product.price}</Text>
                  {product.oldPrice ? (
                    <Text style={styles.oldPrice}>{product.oldPrice}</Text>
                  ) : null}

                  <Pressable
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
    gap: 12,
  },
  contentWeb: {
    paddingTop: 90,
  },
  header: {
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: Palette.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: Palette.textSecondary,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 48,
    marginBottom: 4,
    paddingHorizontal: 14,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 999,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    paddingVertical: 0,
    fontSize: 14,
    color: Palette.text,
  },
  clearButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    backgroundColor: Palette.neutralSoft,
  },
  emptyState: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Palette.text,
  },
  emptyText: {
    fontSize: 13,
    textAlign: 'center',
    color: Palette.textSecondary,
  },
  cardWrapper: {
    backgroundColor: Palette.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  card: {
    padding: 14,
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Palette.text,
  },
  saleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: Palette.accent,
  },
  saleText: {
    fontSize: 10,
    fontWeight: '700',
    color: Palette.text,
  },
  cardCategory: {
    fontSize: 13,
    color: Palette.textSecondary,
  },
  rating: {
    color: Palette.accent,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.text,
  },
  oldPrice: {
    flex: 1,
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: Palette.textSecondary,
  },
  addButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Palette.primary,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: Palette.surface,
  },
  pressed: {
    opacity: 0.7,
  },
});
