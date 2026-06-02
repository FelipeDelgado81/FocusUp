import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface MetricsHeaderProps {
  totalSessions?: number;
  subtitle?: string;
}

export default function MetricsHeader({
  totalSessions,
  subtitle,
}: MetricsHeaderProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  const defaultSubtitle =
    totalSessions === undefined
      ? ''
      : `${totalSessions} ${
          totalSessions === 1 ? 'sesión registrada' : 'sesiones registradas'
        }`;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Tu Rendimiento</Text>
      <Text style={styles.subtitle}>{subtitle ?? defaultSubtitle}</Text>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: 36,
      fontWeight: '700',
      color: COLORS.onBackground,
    },
    subtitle: {
      fontSize: 15,
      fontWeight: '500',
      color: COLORS.onSurfaceVariant,
      marginTop: 6,
    },
  });
