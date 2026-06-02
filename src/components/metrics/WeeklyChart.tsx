import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RADIUS, SHADOWS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { DAY_LABELS } from '../../utils/metrics';

interface WeeklyChartProps {
  data: number[];
}

export default function WeeklyChart({ data }: WeeklyChartProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  const maxWeekly = Math.max(...data, 1);

  if (!data.some((value) => value > 0)) return null;

  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>Esta semana</Text>
      <View style={styles.barsContainer}>
        {data.map((height, index) => {
          const isMax = height === maxWeekly;
          const barColor = isMax
            ? COLORS.primary
            : height > 0
              ? COLORS.primaryFixedDim
              : COLORS.surfaceVariant;

          return (
            <View key={DAY_LABELS[index]} style={styles.barColumn}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    { height: `${height}%`, backgroundColor: barColor },
                    isMax && styles.highlightBar,
                  ]}
                />
              </View>
              <Text style={[styles.barLabel, isMax && styles.highlightLabel]}>
                {DAY_LABELS[index]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    chartCard: {
      backgroundColor: COLORS.surfaceContainerLow,
      borderRadius: RADIUS.xxl,
      padding: 24,
      marginBottom: 28,
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.onSurface,
      marginBottom: 16,
    },
    barsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      height: 160,
      paddingHorizontal: 8,
    },
    barColumn: {
      alignItems: 'center',
      flex: 1,
      gap: 8,
    },
    barTrack: {
      flex: 1,
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    bar: {
      width: 28,
      borderRadius: RADIUS.round,
    },
    highlightBar: {
      ...SHADOWS.sm,
      shadowColor: COLORS.primary,
    },
    barLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: COLORS.outline,
    },
    highlightLabel: {
      color: COLORS.primary,
    },
  });
