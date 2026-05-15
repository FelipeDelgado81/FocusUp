import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';

interface PomodoroSummaryCardProps {
  completedPomodoros: number;
}

export default function PomodoroSummaryCard({
  completedPomodoros,
}: PomodoroSummaryCardProps) {
  return (
    <View style={styles.breakCard}>
      <View style={styles.breakLeft}>
        <View style={styles.breakIcon}>
          <MaterialIcons
            name="coffee"
            size={24}
            color={COLORS.onSecondaryContainer}
          />
        </View>
        <View>
          <Text style={styles.breakLabel}>Pomodoros completados</Text>
          <Text style={styles.breakValue}>{completedPomodoros}</Text>
        </View>
      </View>
      <View style={styles.breakCounter}>
        <Text style={styles.breakCounterText}>{completedPomodoros}/4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  breakCard: {
    width: '100%',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.xxl,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  breakIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondaryContainer + '50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  breakValue: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.onBackground,
    marginTop: 2,
  },
  breakCounter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
