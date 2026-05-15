type ColorPalette = Record<string, string>;
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

export const COLORS: ColorPalette = {
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
