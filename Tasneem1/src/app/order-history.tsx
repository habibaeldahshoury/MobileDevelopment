import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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



  

