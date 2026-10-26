import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from '@/constants/palette';

const FILTERS = ['All', 'Delivered', 'Processing', 'Cancelled'] as const;

type Filter = (typeof FILTERS)[number];
type OrderStatus = Exclude<Filter, 'All'>;

type OrderItem = {
  name: string;
};

type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: string;
};

const ORDERS: Order[] = [
  {
id: '333',
date: 'Oct 27, 2026',
status: 'Delivered',
items: [{ name: ' T-shirt' }, { name: 'Orbit Bluetooth Speaker' }],
total: '350 Egp',
  },

  {
id: '535',
date: 'Oct 26, 2026',
status: 'Processing',
items: [{ name: 'Black Skirt' }],
total: '200 Egp',
  },
{
id: '552',
date: 'Oct 23, 2026',
status: 'Delivered',
items: [{ name: 'white Skirt' }],
total: '400 Egp',
  },
{
id: '520',
date: 'Sept 26, 2026',
status: 'Cancelled',
items: [{ name: 'Black Dress' }],
total: '1500 Egp',
  },
{
id: '529',
date: 'Oct 20, 2026',
status: 'Cancelled',
items: [{ name: 'Black Dress' }],
total: '1500 Egp',
  },
  {
id: '889',
date: 'Oct 22, 2026',
status: 'Cancelled',
items: [{ name: 'Pink Dress' }],
total: '1699 Egp',
  }
];


const STATUS_COLORS: Record<OrderStatus, { backgroundColor: string; color: string }> = {
  Delivered: { backgroundColor: Palette.primarySoft, color: Palette.primary },
  Processing: { backgroundColor: Palette.accentSoft, color: Palette.text },
  Cancelled: { backgroundColor: Palette.neutralSoft, color: Palette.textSecondary },
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    paddingHorizontal: 20,
    gap: 16,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '700',
    letterSpacing: -0.4,
    color: Palette.text,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    color: Palette.textSecondary,
  },
  tabRow: {
    gap: 8,
    paddingRight: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  tabActive: {
    backgroundColor: Palette.primary,
    borderColor: Palette.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  tabTextActive: {
    color: Palette.surface,
  },
  list: {
    gap: 12,
  },
  card: {
    padding: 16,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 16,
  },
  orderTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  orderHeading: {
    flex: 1,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: Palette.text,
  },
  orderDate: {
    marginTop: 2,
    fontSize: 12,
    color: Palette.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  itemInfo: {
    marginTop: 14,
    gap: 2,
  },
  itemName: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    color: Palette.text,
  },
  itemCount: {
    fontSize: 12,
    color: Palette.textSecondary,
  },
  divider: {
    height: 1,
    marginVertical: 14,
    backgroundColor: Palette.border,
  },
  orderFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  totalLabel: {
    fontSize: 11,
    color: Palette.textSecondary,
  },
  totalValue: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '700',
    color: Palette.text,
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Palette.primary,
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.surface,
  },
  emptyState: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 48,
    paddingHorizontal: 24,
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
  pressed: {
    opacity: 0.7,
  },
});






  

