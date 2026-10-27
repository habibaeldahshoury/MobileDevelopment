import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';

const FILTERS = ['All', 'Delivered', 'Processing', 'Cancelled'] as const;

type Filter = (typeof FILTERS)[number];
type OrderStatus = Exclude<Filter, 'All'>;

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: { name: string }[];
  total: string;
};

// Newest first.
const ORDERS: Order[] = [
  {
    id: '333',
    date: 'Oct 27, 2026',
    status: 'Delivered',
    items: [{ name: 'T-shirt' }, { name: 'Orbit Bluetooth Speaker' }],
    total: '350 EGP',
  },
  {
    id: '535',
    date: 'Oct 26, 2026',
    status: 'Processing',
    items: [{ name: 'Black Skirt' }],
    total: '200 EGP',
  },
  {
    id: '552',
    date: 'Oct 23, 2026',
    status: 'Delivered',
    items: [{ name: 'White Skirt' }],
    total: '400 EGP',
  },
  {
    id: '889',
    date: 'Oct 22, 2026',
    status: 'Cancelled',
    items: [{ name: 'Pink Dress' }],
    total: '1699 EGP',
  },
  {
    id: '529',
    date: 'Oct 20, 2026',
    status: 'Cancelled',
    items: [{ name: 'Black Dress' }],
    total: '1500 EGP',
  },
  {
    id: '520',
    date: 'Sep 26, 2026',
    status: 'Cancelled',
    items: [{ name: 'Black Dress' }],
    total: '1500 EGP',
  },
];

const STATUS_CLASSES: Record<OrderStatus, { badge: string; text: string }> = {
  Delivered: { badge: 'bg-primary/10', text: 'text-primary' },
  Processing: { badge: 'bg-accent/15', text: 'text-foreground' },
  Cancelled: { badge: 'bg-gray-100', text: 'text-muted' },
};

function OrderCard({ order }: { order: Order }) {
  const status = STATUS_CLASSES[order.status];
  const itemCount = order.items.length;
  return (
    <View className="rounded-2xl border border-gray-200 bg-surface p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-[15px] font-bold text-foreground">Order #{order.id}</Text>
          <Text className="mt-0.5 text-xs text-muted">{order.date}</Text>
        </View>
        <View className={`rounded-full px-2.5 py-1 ${status.badge}`}>
          <Text className={`text-[11px] font-bold ${status.text}`}>{order.status}</Text>
        </View>
      </View>

      <View className="mt-3.5 gap-0.5">
        <Text className="text-[13px] font-semibold leading-[18px] text-foreground" numberOfLines={2}>
          {order.items.map(item => item.name).join(', ')}
        </Text>
        <Text className="text-xs text-muted">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </Text>
      </View>

      <View className="my-3.5 h-px bg-gray-200" />

      <View className="flex-row items-center justify-between gap-3">
        <View>
          <Text className="text-[11px] text-muted">Total</Text>
          <Text className="mt-0.5 text-base font-bold text-foreground">{order.total}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            router.push({
              pathname: '/track-order',
              params: {
                id: order.id,
                items: order.items.map(item => item.name).join(', '),
                total: order.total,
                date: order.date,
                status: order.status,
              },
            })
          }
          className="rounded-xl bg-primary px-4 py-2.5 active:opacity-70">
          <Text className="text-[13px] font-semibold text-white">View details</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function OrderHistoryScreen() {
  const [filter, setFilter] = useState<Filter>('All');
  const orders = filter === 'All' ? ORDERS : ORDERS.filter(order => order.status === filter);

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-4 px-5 pb-8"
      showsVerticalScrollIndicator={false}>
      <View>
        <Pressable
          accessibilityRole="button"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
          className="mb-2 self-start active:opacity-70">
          <Text className="text-sm font-semibold text-primary">‹ Profile</Text>
        </Pressable>
        <Text className="text-[26px] font-bold tracking-tight text-foreground">Order history</Text>
        <Text className="mt-1 text-sm text-muted">Track and review your past orders.</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2 pr-2">
        {FILTERS.map(option => {
          const active = option === filter;
          return (
            <Pressable
              key={option}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              onPress={() => setFilter(option)}
              className={`rounded-full border px-4 py-2 active:opacity-70 ${
                active ? 'border-primary bg-primary' : 'border-gray-200 bg-surface'
              }`}>
              <Text className={`text-[13px] font-semibold ${active ? 'text-white' : 'text-muted'}`}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {orders.length > 0 ? (
        <View className="gap-3">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </View>
      ) : (
        <View className="items-center gap-1.5 rounded-2xl border border-gray-200 bg-surface px-6 py-12">
          <Text className="text-base font-semibold text-foreground">No {filter.toLowerCase()} orders</Text>
          <Text className="text-center text-[13px] text-muted">
            Orders with this status will show up here.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
