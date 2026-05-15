import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import StatCard from '../StatCard';

interface DashboardStatsRowProps {
  totalCount: number;
  todayCount: number;
}

export default function DashboardStatsRow({
  totalCount,
  todayCount,
}: DashboardStatsRowProps) {
  return (
    <View style={styles.statsRow}>
      <StatCard
        icon="event-note"
        iconColor={COLORS.primary}
        value={totalCount.toString()}
        label="Sesiones"
      />
      <View style={styles.gap} />
      <StatCard
        icon="today"
        iconColor={COLORS.tertiary}
        value={todayCount.toString()}
        label="Hoy"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  gap: {
    width: 16,
  },
});
