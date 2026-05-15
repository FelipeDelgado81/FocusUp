import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, RADIUS } from '../../constants/theme';
import MetricTile from './MetricTile';

interface MetricsStatsGridProps {
  totalSessions: number;
  todaySessions: number;
  completedTasks: number;
  streak: number;
}

export default function MetricsStatsGrid({
  totalSessions,
  todaySessions,
  completedTasks,
  streak,
}: MetricsStatsGridProps) {
  return (
    <View style={styles.statsGrid}>
      <View style={styles.statsRow}>
        <MetricTile
          icon="event-note"
          iconColor={COLORS.primary}
          label="Total sesiones"
          value={totalSessions}
          style={styles.primaryBorder}
        />
        <MetricTile
          icon="local-fire-department"
          iconColor={COLORS.tertiary}
          label="Racha"
          value={`${streak} ${streak === 1 ? 'día' : 'días'}`}
          labelColor={COLORS.onTertiaryFixed}
          valueColor={COLORS.onTertiaryFixed}
          style={styles.tertiaryTile}
        />
      </View>

      <View style={styles.statsRow}>
        <MetricTile
          icon="today"
          iconColor={COLORS.secondary}
          label="Hoy"
          value={todaySessions}
          style={styles.secondaryBorder}
        />
        <MetricTile
          icon="task-alt"
          iconColor={COLORS.primary}
          label="Completadas"
          value={completedTasks}
          labelColor={COLORS.onPrimaryFixed}
          valueColor={COLORS.onPrimaryFixed}
          style={styles.primaryTile}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  primaryBorder: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.primary,
  },
  secondaryBorder: {
    borderBottomWidth: 4,
    borderBottomColor: COLORS.secondary,
  },
  primaryTile: {
    backgroundColor: COLORS.primaryFixed,
  },
  tertiaryTile: {
    backgroundColor: COLORS.tertiaryFixed,
    borderRadius: RADIUS.xxl,
  },
});
