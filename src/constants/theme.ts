type FontStyle = {
  fontFamily: string;
  fontWeight: '400' | '500' | '600' | '700' | '800';
  letterSpacing?: number;
};
type Fonts = Record<string, FontStyle>;
type Spacing = Record<string, number>;
type Radius = Record<string, number>;
type Shadow = {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
};
type Shadows = Record<string, Shadow>;

export const lightColors = {
  background: '#f7f9fb',
  onBackground: '#191c1e',
  surface: '#f7f9fb',
  onSurface: '#191c1e',
  onSurfaceVariant: '#434655',
  primary: '#004ac6',
  onPrimary: '#ffffff',
  primaryContainer: '#2563eb',
  onPrimaryContainer: '#eeefff',
  primaryFixed: '#dbe1ff',
  primaryFixedDim: '#b4c5ff',
  onPrimaryFixed: '#00174b',
  onPrimaryFixedVariant: '#003ea8',
  secondary: '#006c49',
  onSecondary: '#ffffff',
  secondaryContainer: '#6cf8bb',
  onSecondaryContainer: '#00714d',
  secondaryFixed: '#6ffbbe',
  secondaryFixedDim: '#4edea3',
  onSecondaryFixed: '#002113',
  onSecondaryFixedVariant: '#005236',
  tertiary: '#784b00',
  onTertiary: '#ffffff',
  tertiaryContainer: '#996100',
  onTertiaryContainer: '#ffeedd',
  tertiaryFixed: '#ffddb8',
  tertiaryFixedDim: '#ffb95f',
  onTertiaryFixed: '#2a1700',
  onTertiaryFixedVariant: '#653e00',
  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
  surfaceBright: '#f7f9fb',
  surfaceDim: '#d8dadc',
  surfaceTint: '#0053db',
  surfaceVariant: '#e0e3e5',
  surfaceContainer: '#eceef0',
  surfaceContainerLow: '#f2f4f6',
  surfaceContainerHigh: '#e6e8ea',
  surfaceContainerHighest: '#e0e3e5',
  surfaceContainerLowest: '#ffffff',
  outline: '#737686',
  outlineVariant: '#c3c6d7',
  inverseSurface: '#2d3133',
  inverseOnSurface: '#eff1f3',
  inversePrimary: '#b4c5ff',
  white: '#ffffff',
  transparent: 'transparent',
};

export type ThemeColors = typeof lightColors;

// Las claves "Fixed" de Material 3 se mantienen iguales en ambos temas.
export const darkColors: ThemeColors = {
  background: '#111416',
  onBackground: '#e2e2e5',
  surface: '#111416',
  onSurface: '#e2e2e5',
  onSurfaceVariant: '#c3c6cf',
  primary: '#b4c5ff',
  onPrimary: '#002c71',
  primaryContainer: '#1b46a3',
  onPrimaryContainer: '#dbe1ff',
  primaryFixed: '#dbe1ff',
  primaryFixedDim: '#b4c5ff',
  onPrimaryFixed: '#00174b',
  onPrimaryFixedVariant: '#003ea8',
  secondary: '#4edea3',
  onSecondary: '#003824',
  secondaryContainer: '#005236',
  onSecondaryContainer: '#6ffbbe',
  secondaryFixed: '#6ffbbe',
  secondaryFixedDim: '#4edea3',
  onSecondaryFixed: '#002113',
  onSecondaryFixedVariant: '#005236',
  tertiary: '#ffb95f',
  onTertiary: '#452b00',
  tertiaryContainer: '#653e00',
  onTertiaryContainer: '#ffddb8',
  tertiaryFixed: '#ffddb8',
  tertiaryFixedDim: '#ffb95f',
  onTertiaryFixed: '#2a1700',
  onTertiaryFixedVariant: '#653e00',
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',
  onErrorContainer: '#ffdad6',
  surfaceBright: '#37393b',
  surfaceDim: '#111416',
  surfaceTint: '#b4c5ff',
  surfaceVariant: '#43474e',
  surfaceContainer: '#1d2022',
  surfaceContainerLow: '#191c1e',
  surfaceContainerHigh: '#282a2d',
  surfaceContainerHighest: '#333537',
  surfaceContainerLowest: '#0c0f10',
  outline: '#8d9199',
  outlineVariant: '#43474e',
  inverseSurface: '#e2e2e5',
  inverseOnSurface: '#2d3133',
  inversePrimary: '#004ac6',
  white: '#ffffff',
  transparent: 'transparent',
};

// Compatibilidad: usos estáticos no temáticos (utilidades, acentos de gráficos).
export const COLORS = lightColors;

export const FONTS: Fonts = {
  headline: { fontFamily: 'System', fontWeight: '700' },
  headlineExtraBold: { fontFamily: 'System', fontWeight: '800' },
  body: { fontFamily: 'System', fontWeight: '400' },
  bodyMedium: { fontFamily: 'System', fontWeight: '500' },
  bodySemiBold: { fontFamily: 'System', fontWeight: '600' },
  label: { fontFamily: 'System', fontWeight: '700', letterSpacing: 1.2 },
};

export const SPACING: Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS: Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 999,
};

export const SHADOWS: Shadows = {
  sm: {
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 4,
  },
  lg: {
    shadowColor: '#191c1e',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 6,
  },
  primaryGlow: {
    shadowColor: '#004ac6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
    elevation: 8,
  },
};
