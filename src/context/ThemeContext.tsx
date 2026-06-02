import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkColors, lightColors, type ThemeColors } from '../constants/theme';

type ThemeMode = 'light' | 'dark';

const THEME_KEY = '@focusup_theme';

interface ThemeContextValue {
  colors: ThemeColors;
  mode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemScheme = useColorScheme();
  const [override, setOverride] = useState<ThemeMode | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(THEME_KEY)
      .then((value) => {
        if (value === 'light' || value === 'dark') {
          setOverride(value);
        }
      })
      .catch((e) => console.error('Error reading theme:', e));
  }, []);

  const systemMode: ThemeMode = systemScheme === 'dark' ? 'dark' : 'light';
  const mode: ThemeMode = override ?? systemMode;

  const toggleTheme = useCallback(() => {
    setOverride((prev) => {
      const current = prev ?? systemMode;
      const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
      AsyncStorage.setItem(THEME_KEY, next).catch((e) =>
        console.error('Error saving theme:', e),
      );
      return next;
    });
  }, [systemMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      colors: mode === 'dark' ? darkColors : lightColors,
      mode,
      isDark: mode === 'dark',
      toggleTheme,
    }),
    [mode, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
}
