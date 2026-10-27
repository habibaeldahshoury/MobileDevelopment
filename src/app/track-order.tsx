import { Pressable, ScrollView, Text, View } from 'react-native';
import { router } from 'expo-router';

type Step = {
  label: string;
  description: string;
  time?: string;
};

const STEPS: Step[] = [
  { label: 'Order placed', description: 'We received your order.', time: 'Oct 26, 10:15 AM' },
  { label: 'Confirmed', description: 'The seller confirmed your order.', time: 'Oct 26, 11:40 AM' },
  { label: 'Shipped', description: 'Your package left the warehouse.', time: 'Oct 27, 9:05 AM' },
  { label: 'Out for delivery', description: 'The courier is on the way to you.' },
  { label: 'Delivered', description: 'Your package has arrived.' },
];

// The in-progress order from order history; index of the latest completed step.
const ORDER = {
  id: '535',
  items: 'Black Skirt',
  total: '200 EGP',
  address: 'Cairo, Obour, Egypt',
  estimatedDelivery: 'Oct 29, 2026',
  currentStep: 2,
};

function TimelineStep({ step, index }: { step: Step; index: number }) {
  const isDone = index <= ORDER.currentStep;
  const isCurrent = index === ORDER.currentStep;
  const isLast = index === STEPS.length - 1;

  return (
    <View className="flex-row gap-3">
      <View className="items-center">
        <View
          className={`h-6 w-6 items-center justify-center rounded-full ${
            isDone ? 'bg-primary' : 'border-2 border-gray-200 bg-surface'
          }`}>
          {isDone ? <Text className="text-xs font-bold text-white">✓</Text> : null}
        </View>
        {isLast ? null : (
          <View
            className={`w-0.5 flex-1 ${index < ORDER.currentStep ? 'bg-primary' : 'bg-gray-200'}`}
          />
        )}
      </View>

      <View className={`flex-1 ${isLast ? '' : 'pb-5'}`}>
        <Text
          className={`text-sm font-semibold ${
            isCurrent ? 'text-primary' : isDone ? 'text-foreground' : 'text-muted'
          }`}>
          {step.label}
        </Text>
        <Text className="mt-0.5 text-xs text-muted">{step.description}</Text>
        {step.time ? <Text className="mt-0.5 text-[11px] text-muted">{step.time}</Text> : null}
      </View>
    </View>
  );
}

export default function TrackOrderScreen() {
  const progress = (ORDER.currentStep + 1) / STEPS.length;

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
        <Text className="text-[26px] font-bold tracking-tight text-foreground">Track order</Text>
        <Text className="mt-1 text-sm text-muted">Follow your order until it reaches you.</Text>
      </View>

      <View className="rounded-2xl border border-gray-200 bg-surface p-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-[15px] font-bold text-foreground">Order #{ORDER.id}</Text>
            <Text className="mt-0.5 text-xs text-muted">{ORDER.items}</Text>
          </View>
          <View className="rounded-full bg-accent/15 px-2.5 py-1">
            <Text className="text-[11px] font-bold text-foreground">
              {STEPS[ORDER.currentStep].label}
            </Text>
          </View>
        </View>

        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: STEPS.length, now: ORDER.currentStep + 1 }}
          className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
          <View className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
        </View>

        <View className="mt-3 flex-row justify-between gap-3">
          <View>
            <Text className="text-[11px] text-muted">Estimated delivery</Text>
            <Text className="mt-0.5 text-[13px] font-semibold text-foreground">
              {ORDER.estimatedDelivery}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-[11px] text-muted">Total</Text>
            <Text className="mt-0.5 text-[13px] font-semibold text-foreground">{ORDER.total}</Text>
          </View>
        </View>
      </View>

      <View className="gap-2">
        <Text className="pl-1 text-xs font-bold uppercase tracking-wider text-muted">Progress</Text>
        <View className="rounded-2xl border border-gray-200 bg-surface p-4">
          {STEPS.map((step, index) => (
            <TimelineStep key={step.label} step={step} index={index} />
          ))}
        </View>
      </View>

      <View className="gap-2">
        <Text className="pl-1 text-xs font-bold uppercase tracking-wider text-muted">
          Delivery address
        </Text>
        <View className="rounded-2xl border border-gray-200 bg-surface px-3.5 py-3">
          <Text className="text-[13px] font-medium text-foreground">{ORDER.address}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/support-chat')}
        className="items-center rounded-[14px] border border-gray-200 bg-surface py-3.5 active:opacity-70">
        <Text className="text-sm font-semibold text-primary">Need help with this order?</Text>
      </Pressable>
    </ScrollView>
  );
}
