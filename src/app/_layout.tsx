import '../../global.css';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Slot, router, usePathname, type Href } from 'expo-router';
import { Host, SearchBar, Icon, NavigationBar, NavigationBarItem, Text } from '@expo/ui/jetpack-compose';
import colors from '../theme/colors';

// Maps the palette onto the Material 3 roles the Compose components use.
const MATERIAL_COLORS = {
  primary: colors.primary,
  onPrimary: colors.surface,
  tertiary: colors.accent,
  background: colors.background,
  surface: colors.surface,
  onSurface: colors.foreground,
  onSurfaceVariant: colors.muted,
};

const TAB_COLORS = {
  selectedIconColor: colors.surface,
  selectedIndicatorColor: colors.primary,
  selectedTextColor: colors.primary,
  unselectedIconColor: colors.muted,
  unselectedTextColor: colors.muted,
};

const TABS: { href: Href; label: string; icon: number }[] = [
  { href: '/', label: 'Home', icon: require('../../assets/home.png') },
  { href: '/categories', label: 'Categories', icon: require('../../assets/categories.png') },
  { href: '/cart', label: 'Cart', icon: require('../../assets/cart.png') },
  { href: '/profile', label: 'Profile', icon: require('../../assets/profile.png') },
];

export default function RootLayout() {
  const pathname = usePathname();
  // Sub-pages keep their parent tab highlighted.
  const activeTab = ['/order-history', '/track-order', '/support-chat'].includes(pathname) ? '/profile' : pathname;
  const showSearch = pathname === '/';
  // Bumping the key remounts the search bar, which closes its full-screen view
  // (@expo/ui has no prop to collapse it from JS).
  const [searchKey, setSearchKey] = useState(0);

  const submitSearch = (searchText: string) => {
    setSearchKey(key => key + 1);
    router.push({ pathname: '/search-results', params: { q: searchText.trim() } });
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-background">
      {showSearch ? (
        <View className="self-center my-4">
          <Host key={searchKey} matchContents colorOverrides={MATERIAL_COLORS}>
            <SearchBar onSearch={submitSearch}>
              <SearchBar.Placeholder>
                <Text>Search products</Text>
              </SearchBar.Placeholder>
              <SearchBar.ExpandedFullScreenSearchBar>
                <Text>Press search on the keyboard to see results</Text>
              </SearchBar.ExpandedFullScreenSearchBar>
            </SearchBar>
          </Host>
        </View>
      ) : null}

      {/* The current route's screen (src/app/index.tsx, categories.tsx, ...) renders here. */}
      <View className={`flex-1 ${showSearch ? '' : 'pt-4'}`}>
        <Slot />
      </View>

      <View className="w-full">
        <Host matchContents={{ vertical: true }} colorOverrides={MATERIAL_COLORS}>
          <NavigationBar containerColor={colors.surface}>
            {TABS.map(tab => (
              <NavigationBarItem
                key={tab.label}
                colors={TAB_COLORS}
                selected={activeTab === tab.href}
                onClick={() => router.replace(tab.href)}>
                <NavigationBarItem.Icon>
                  <Icon source={tab.icon} />
                </NavigationBarItem.Icon>
                <NavigationBarItem.Label>
                  <Text>{tab.label}</Text>
                </NavigationBarItem.Label>
              </NavigationBarItem>
            ))}
          </NavigationBar>
        </Host>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
