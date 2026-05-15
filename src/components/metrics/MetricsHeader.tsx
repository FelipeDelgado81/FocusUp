import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

interface MetricsHeaderProps {
  totalSessions?: number;
  subtitle?: string;
}

export default function MetricsHeader({
  totalSessions,
  subtitle,
}: MetricsHeaderProps) {
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

const styles = StyleSheet.create({
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
