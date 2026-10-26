// App colour palette. Shared by tailwind.config.js (for `className`) and the
// Jetpack Compose components in @expo/ui (which can't read Tailwind classes).

/** @type {Record<'primary' | 'accent' | 'background' | 'surface' | 'foreground' | 'muted', `#${string}`>} */
module.exports = {
  primary: '#4F46E5', // indigo: buttons, active tabs
  accent: '#F59E0B', // amber: sale badges, ratings
  background: '#F9FAFB',
  surface: '#FFFFFF', // cards
  foreground: '#111827', // text
  muted: '#6B7280', // secondary text
};
