import { useState } from 'react';
import { Keyboard, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import colors from '../theme/colors';

const addresses = ['Cairo, Obour, Egypt', 'Giza, Egypt', 'Madinaty, Egypt', 'Alexandria, Egypt'];

const paymentMethods = ['Vodafone Cash', 'VISA', 'InstaPay'];

type MenuRowProps = {
  label: string;
  isLast?: boolean;
  expanded?: boolean;
  onPress?: () => void;
};

function MenuRow({ label, isLast, expanded, onPress }: MenuRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={expanded === undefined ? undefined : { expanded }}
      onPress={onPress}
      className={`flex-row items-center gap-3 px-3.5 py-3 active:opacity-70 ${
        isLast ? '' : 'border-b border-gray-200'
      }`}>
      <Text className="flex-1 text-sm font-semibold text-foreground">{label}</Text>
      <Text className={`text-lg text-muted ${expanded ? 'rotate-90' : ''}`}>›</Text>
    </Pressable>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center gap-3 border-b border-gray-200 px-3.5 py-2.5">
      <Text className="text-xs text-muted">{label}</Text>
      <Text className="flex-1 text-right text-[13px] font-semibold text-foreground">{value}</Text>
    </View>
  );
}

function DetailRow({ value, isLast }: { value: string; isLast?: boolean }) {
  return (
    <View className={`px-3.5 py-3 ${isLast ? '' : 'border-b border-gray-200'}`}>
      <Text className="text-[13px] font-medium text-foreground">{value}</Text>
    </View>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text className="text-lg font-bold text-foreground">{value}</Text>
      <Text className="text-xs text-muted">{label}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const [user, setUser] = useState({ name: 'Tasneem', email: 'tasneem@gmail.com' });
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(user.name);
  const [draftEmail, setDraftEmail] = useState(user.email);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const canSave = draftName.trim().length > 0 && draftEmail.trim().length > 0;

  const startEditing = () => {
    setDraftName(user.name);
    setDraftEmail(user.email);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    Keyboard.dismiss();
  };

  const saveProfile = () => {
    if (!canSave) return;
    setUser({ name: draftName.trim(), email: draftEmail.trim() });
    setIsEditing(false);
    Keyboard.dismiss();
  };

  // The root layout already handles the status bar, top safe area and nav bar.
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerClassName="gap-4 px-5 pb-8"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag">
      <View>
        <Text className="text-[26px] font-bold tracking-tight text-foreground">Profile</Text>
        <Text className="mt-1 text-sm text-muted">Manage your account and preferences.</Text>
      </View>

      <View className="items-center rounded-2xl border border-gray-200 bg-surface p-5">
        <View className="h-[76px] w-[76px] items-center justify-center rounded-full bg-primary/10">
          <Text className="text-[26px] font-bold text-primary">{initials}</Text>
        </View>

        {isEditing ? (
          <View className="mt-3.5 gap-2.5 self-stretch">
            <TextInput
              accessibilityLabel="Name"
              placeholder="Name"
              placeholderTextColor={colors.muted}
              value={draftName}
              onChangeText={setDraftName}
              className="h-11 rounded-xl border border-gray-200 bg-background px-3 text-sm text-foreground"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <TextInput
              accessibilityLabel="Email"
              placeholder="Email"
              placeholderTextColor={colors.muted}
              value={draftEmail}
              onChangeText={setDraftEmail}
              className="h-11 rounded-xl border border-gray-200 bg-background px-3 text-sm text-foreground"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="done"
              onSubmitEditing={saveProfile}
            />

            <View className="flex-row gap-2.5">
              <Pressable
                accessibilityRole="button"
                onPress={cancelEditing}
                className="flex-1 items-center rounded-xl border border-gray-200 bg-surface py-3 active:opacity-70">
                <Text className="text-[13px] font-semibold text-muted">Cancel</Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                disabled={!canSave}
                onPress={saveProfile}
                className={`flex-1 items-center rounded-xl bg-primary py-3 active:opacity-70 ${
                  canSave ? '' : 'opacity-50'
                }`}>
                <Text className="text-[13px] font-semibold text-white">Save</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <>
            <Text className="mt-3 text-lg font-bold text-foreground">{user.name}</Text>
            <Text className="mt-0.5 text-[13px] text-muted">{user.email}</Text>

            <Pressable
              accessibilityRole="button"
              onPress={startEditing}
              className="mt-3.5 rounded-xl bg-primary px-5 py-2.5 active:opacity-70">
              <Text className="text-[13px] font-semibold text-white">Edit profile</Text>
            </Pressable>
          </>
        )}

        <View className="my-[18px] h-px self-stretch bg-gray-200" />

        <View className="flex-row items-center self-stretch">
          <Stat value={12} label="Orders" />
          <View className="h-7 w-px bg-gray-200" />
          <Stat value={8} label="Wishlist" />
          <View className="h-7 w-px bg-gray-200" />
          <Stat value={5} label="Reviews" />
        </View>
      </View>

      <View className="gap-2">
        <Text className="pl-1 text-xs font-bold uppercase tracking-wider text-muted">Account</Text>
        <View className="overflow-hidden rounded-2xl border border-gray-200 bg-surface">
          <MenuRow label="Order history" onPress={() => router.push('/order-history')} />

          <MenuRow label="Track order" onPress={() => router.push('/track-order')} />

          <MenuRow
            label="Personal information"
            expanded={showPersonalInfo}
            onPress={() => setShowPersonalInfo(value => !value)}
          />

          {showPersonalInfo ? (
            <>
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
            </>
          ) : null}

          <MenuRow
            label="Shipping addresses"
            expanded={showAddresses}
            onPress={() => setShowAddresses(value => !value)}
          />

          {showAddresses
            ? addresses.map(address => <DetailRow key={address} value={address} />)
            : null}

          <MenuRow
            label="Payment methods"
            expanded={showPayments}
            onPress={() => setShowPayments(value => !value)}
            isLast={!showPayments}
          />

          {showPayments
            ? paymentMethods.map((method, index) => (
                <DetailRow key={method} value={method} isLast={index === paymentMethods.length - 1} />
              ))
            : null}
        </View>
      </View>

      <View className="gap-2">
        <Text className="pl-1 text-xs font-bold uppercase tracking-wider text-muted">Help</Text>
        <View className="overflow-hidden rounded-2xl border border-gray-200 bg-surface">
          <MenuRow label="Chat with support" onPress={() => router.push('/support-chat')} isLast />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        className="items-center rounded-[14px] border border-gray-200 bg-surface py-3.5 active:opacity-70">
        <Text className="text-sm font-semibold text-muted">Log out</Text>
      </Pressable>
    </ScrollView>
  );
}
