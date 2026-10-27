import { Pressable, ScrollView, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

type Step = {
  label: string;
  description: string;
  time?: string;
  cancelled?: boolean;
};

const STEPS: Step[] = [
  { label: 'Order placed', description: 'We received your order.', time: 'Oct 26, 10:15 AM' },
  { label: 'Confirmed', description: 'The seller confirmed your order.', time: 'Oct 26, 11:40 AM' },
  { label: 'Shipped', description: 'Your package left the warehouse.', time: 'Oct 27, 9:05 AM' },
  { label: 'Out for delivery', description: 'The courier is on the way to you.' },
  { label: 'Delivered', description: 'Your package has arrived.' },
];

const ACTIVE_ORDER = {
  id: '535',
  items: 'Black Skirt',
  total: '200 EGP',
  address: 'Cairo, Obour, Egypt',
  estimatedDelivery: 'Oct 29, 2026',
  currentStep: 2,
};

type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

type TrackOrderParams = {
  id?: string;
  items?: string;
  total?: string;
  date?: string;
  status?: OrderStatus;
};

const STATUS_VIEW: Record<
  OrderStatus,
  { subtitle: string; badge: string; badgeText: string; dateLabel: string }
> = {
  Delivered: {
    subtitle: 'This order has been completed.',
    badge: 'bg-primary/10',
    badgeText: 'text-primary',
    dateLabel: 'Delivered on',
  },
  Processing: {
    subtitle: 'Follow your order until it reaches you.',
    badge: 'bg-accent/15',
    badgeText: 'text-foreground',
    dateLabel: 'Estimated delivery',
  },
  Cancelled: {
    subtitle: 'This order was cancelled.',
    badge: 'bg-gray-100',
    badgeText: 'text-muted',
    dateLabel: 'Cancelled on',
  },
};

// Timeline for an order opened from order history, based on its status.
function getPastOrderSteps(status: OrderStatus, date?: string): { steps: Step[]; currentStep: number } {
  if (status === 'Cancelled') {
    return {
      steps: [
        { ...STEPS[0], time: date },
        { label: 'Cancelled', description: 'This order was cancelled and will not be delivered.', cancelled: true },
      ],
      currentStep: 1,
    };
  }
  if (status === 'Processing') {
    return {
      steps: STEPS.map((step, index) => ({ ...step, time: index === 0 ? date : undefined })),
      currentStep: 1,
    };
  }
  return {
    steps: STEPS.map((step, index) => ({ ...step, time: index === STEPS.length - 1 ? date : undefined })),
    currentStep: STEPS.length - 1,
  };
}

function TimelineStep({
  step,
  index,
  currentStep,
  isLast,
}: {
  step: Step;
  index: number;
  currentStep: number;
  isLast: boolean;
}) {
  const isDone = index <= currentStep;
  const isCurrent = index === currentStep;

  return (
    <View className="flex-row gap-3">
      <View className="items-center">
        {step.cancelled ? (
          <View className="h-6 w-6 items-center justify-center rounded-full bg-gray-200">
            <Text className="text-xs font-bold text-muted">✕</Text>
          </View>
        ) : (
          <View
            className={`h-6 w-6 items-center justify-center rounded-full ${
              isDone ? 'bg-primary' : 'border-2 border-gray-200 bg-surface'
            }`}>
            {isDone ? <Text className="text-xs font-bold text-white">✓</Text> : null}
          </View>
        )}
        {isLast ? null : (
          <View
            className={`w-0.5 flex-1 ${index < currentStep ? 'bg-primary' : 'bg-gray-200'}`}
          />
        )}
      </View>

      <View className={`flex-1 ${isLast ? '' : 'pb-5'}`}>
        <Text
          className={`text-sm font-semibold ${
            step.cancelled ? 'text-muted' : isCurrent ? 'text-primary' : isDone ? 'text-foreground' : 'text-muted'
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
  const params = useLocalSearchParams<TrackOrderParams>();
  // Opened from order history: show that order according to its status.
  const isPastOrder = Boolean(params.id);
  const status: OrderStatus = params.status ?? 'Processing';
  const view = STATUS_VIEW[status];
  const { steps, currentStep } = isPastOrder
    ? getPastOrderSteps(status, params.date)
    : { steps: STEPS, currentStep: ACTIVE_ORDER.currentStep };
  const ORDER = isPastOrder
    ? { ...ACTIVE_ORDER, id: params.id!, items: params.items ?? '', total: params.total ?? '' }
    : ACTIVE_ORDER;
  const dateValue = isPastOrder && status !== 'Processing' ? params.date : ORDER.estimatedDelivery;
  const progress = (currentStep + 1) / steps.length;

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-4 px-5 pb-8"
      showsVerticalScrollIndicator={false}>
      <View>
        <Pressable
          accessibilityRole="button"
          onPress={() => (router.canGoBack() ? router.back() : router.replace(isPastOrder ? '/order-history' : '/profile'))}
          className="mb-2 self-start active:opacity-70">
          <Text className="text-sm font-semibold text-primary">
            {isPastOrder ? '‹ Order history' : '‹ Profile'}
          </Text>
        </Pressable>
        <Text className="text-[26px] font-bold tracking-tight text-foreground">Track order</Text>
        <Text className="mt-1 text-sm text-muted">
          {view.subtitle}
        </Text>
      </View>

      <View className="rounded-2xl border border-gray-200 bg-surface p-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-[15px] font-bold text-foreground">Order #{ORDER.id}</Text>
            <Text className="mt-0.5 text-xs text-muted">{ORDER.items}</Text>
          </View>
          <View className={`rounded-full px-2.5 py-1 ${view.badge}`}>
            <Text className={`text-[11px] font-bold ${view.badgeText}`}>
              {steps[currentStep].label}
            </Text>
          </View>
        </View>

        {status === 'Cancelled' ? null : (
          <View
            accessibilityRole="progressbar"
            accessibilityValue={{ min: 0, max: steps.length, now: currentStep + 1 }}
            className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
            <View className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </View>
        )}

        <View className="mt-3 flex-row justify-between gap-3">
          <View>
            <Text className="text-[11px] text-muted">{view.dateLabel}</Text>
            <Text className="mt-0.5 text-[13px] font-semibold text-foreground">
              {dateValue}
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
          {steps.map((step, index) => (
            <TimelineStep
              key={step.label}
              step={step}
              index={index}
              currentStep={currentStep}
              isLast={index === steps.length - 1}
            />
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
