import { SymbolView } from 'expo-symbols';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {Keyboard,Platform,Pressable,ScrollView,StyleSheet,Text,TextInput, View,} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Palette } from '@/constants/palette';

const addresses = ['Cairo, Obour, Egypt', 'Giza, Egypt', 'Madinaty, Egypt', 'Alexandria, Egypt'];

const paymentMethods = ['Vodafone Cash', 'VISA', 'InstaPay',];

type MenuRowProps = {
  label: string;
  isLast?: boolean;
  showChevron?: boolean;
  expanded?: boolean;
  onPress?: () => void;
};

function MenuRow({ label, isLast, showChevron = true, expanded, onPress }: MenuRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={onPress ? { expanded: Boolean(expanded) } : undefined}
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuRow,
        !isLast && styles.menuRowBorder,
        pressed && styles.pressed,
      ]}>
      <Text style={styles.menuLabel}>{label}</Text>
      {showChevron ? (
        <View style={[styles.chevronWrapper, expanded && styles.chevronWrapperOpen]}>
          <SymbolView
            name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
            size={16}
            tintColor={Palette.textSecondary}
          />
        </View>
      ) : null}
    </Pressable>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function DetailRow({ value, isLast }: { value: string; isLast?: boolean }) {
  return (
    <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
      <Text style={styles.detailText}>{value}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState({ name: 'Tasneem', email: 'tasneem@gmail.com' });
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(user.name);
  const [draftEmail, setDraftEmail] = useState(user.email);
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showPayments, setShowPayments] = useState(false);

  const initials =
    user.name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
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

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Platform.OS === 'web' ? 96 : insets.top + 16,
            paddingBottom: insets.bottom + 32,
          },
        ]}>
        <View>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your account and preferences.</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>

          {isEditing ? (
            <View style={styles.form}>
              <TextInput
                accessibilityLabel="Name"
                placeholder="Name"
                placeholderTextColor={Palette.textSecondary}
                value={draftName}
                onChangeText={setDraftName}
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="next"
              />

              <TextInput
                accessibilityLabel="Email"
                placeholder="Email"
                placeholderTextColor={Palette.textSecondary}
                value={draftEmail}
                onChangeText={setDraftEmail}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="done"
                onSubmitEditing={saveProfile}
              />

              <View style={styles.formActions}>
                <Pressable
                  accessibilityRole="button"
                  onPress={cancelEditing}
                  style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  disabled={!canSave}
                  onPress={saveProfile}
                  style={({ pressed }) => [
                    styles.saveButton,
                    !canSave && styles.saveButtonDisabled,
                    pressed && styles.pressed,
                  ]}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>

              <Pressable
                accessibilityRole="button"
                onPress={startEditing}
                style={({ pressed }) => [styles.editButton, pressed && styles.pressed]}>
                <Text style={styles.editButtonText}>Edit profile</Text>
              </Pressable>
            </>
          )}

          <View style={styles.divider} />

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>Wishlist</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuCard}>
            <MenuRow
              label="Personal information"
              expanded={showPersonalInfo}
              onPress={() => setShowPersonalInfo((value) => !value)}
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
              onPress={() => setShowAddresses((value) => !value)}
            />

            {showAddresses
              ? addresses.map((address) => <DetailRow key={address} value={address} />)
              : null}

            <MenuRow
              label="Payment methods"
              expanded={showPayments}
              onPress={() => setShowPayments((value) => !value)}
              isLast={!showPayments}
            />

            {showPayments
              ? paymentMethods.map((method, index) => (
                  <DetailRow
                    key={method}
                    value={method}
                    isLast={index === paymentMethods.length - 1}
                  />
                ))
              : null}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

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
  profileCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 16,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.primarySoft,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: '700',
    color: Palette.primary,
  },
  name: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text,
  },
  email: {
    marginTop: 2,
    fontSize: 13,
    color: Palette.textSecondary,
  },
  editButton: {
    marginTop: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Palette.primary,
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.surface,
  },
  form: {
    alignSelf: 'stretch',
    marginTop: 14,
    gap: 10,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 12,
    backgroundColor: Palette.background,
    fontSize: 14,
    color: Palette.text,
  },
  formActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Palette.border,
    backgroundColor: Palette.surface,
  },
  cancelButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  saveButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 11,
    borderRadius: 12,
    backgroundColor: Palette.primary,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Palette.surface,
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    marginVertical: 18,
    backgroundColor: Palette.border,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Palette.text,
  },
  statLabel: {
    fontSize: 12,
    color: Palette.textSecondary,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: Palette.border,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    paddingLeft: 4,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: Palette.textSecondary,
  },
  menuCard: {
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: Palette.text,
  },
  chevronWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronWrapperOpen: {
    transform: [{ rotate: '90deg' }],
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  infoLabel: {
    fontSize: 12,
    color: Palette.textSecondary,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: Palette.text,
  },
  detailRow: {
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Palette.border,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '500',
    color: Palette.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: Palette.surface,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: 14,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: Palette.textSecondary,
  },
  pressed: {
    opacity: 0.7,
  },
});
