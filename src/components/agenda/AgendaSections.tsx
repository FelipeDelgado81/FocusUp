import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface SessionsDayHeaderProps {
  count: number;
}

export function SessionsDayHeader({ count }: SessionsDayHeaderProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.sessionsHeader}>
      <Text style={styles.sessionsLabel}>Sesiones del día</Text>
      <Text style={styles.sessionsCount}>
        {count} {count === 1 ? 'sesión' : 'sesiones'}
      </Text>
    </View>
  );
}

export function EmptyDaySessions() {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.emptyState}>
      <MaterialIcons
        name="event-available"
        size={48}
        color={COLORS.outlineVariant}
      />
      <Text style={styles.emptyTitle}>Sin sesiones</Text>
      <Text style={styles.emptySub}>
        No hay sesiones programadas para este día
      </Text>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    sessionsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
      paddingHorizontal: 6,
    },
    sessionsLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: COLORS.onSurfaceVariant,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    sessionsCount: {
      fontSize: 12,
      fontWeight: '500',
      color: COLORS.primary,
    },
    emptyState: {
      alignItems: 'center',
      paddingVertical: 48,
      gap: 8,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.onSurface,
    },
    emptySub: {
      fontSize: 13,
      color: COLORS.onSurfaceVariant,
      textAlign: 'center',
    },
  });
