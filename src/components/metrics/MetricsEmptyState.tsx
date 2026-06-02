import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export default function MetricsEmptyState() {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.emptyState}>
      <MaterialIcons name="bar-chart" size={64} color={COLORS.outlineVariant} />
      <Text style={styles.emptyTitle}>Sin datos aún</Text>
      <Text style={styles.emptySub}>
        Crea sesiones de estudio para empezar a ver tu progreso
      </Text>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    emptyState: {
      alignItems: 'center',
      paddingVertical: 60,
      gap: 12,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: COLORS.onSurface,
    },
    emptySub: {
      fontSize: 14,
      color: COLORS.onSurfaceVariant,
      textAlign: 'center',
    },
  });
