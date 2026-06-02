import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { RADIUS, SHADOWS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

const RING_RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface DailyProgressCardProps {
  todayCount: number;
  totalCount: number;
  progress: number;
}

export default function DailyProgressCard({
  todayCount,
  totalCount,
  progress,
}: DailyProgressCardProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  const strokeOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <View style={styles.progressCard}>
      <View style={styles.progressCopy}>
        <Text style={styles.progressLabel}>Tu progreso hoy</Text>
        <Text style={styles.progressTitle}>
          {todayCount} {todayCount === 1 ? 'sesión' : 'sesiones'}
        </Text>
        <View style={styles.trendBadge}>
          <MaterialIcons
            name="event-note"
            size={14}
            color={COLORS.onSecondaryContainer}
          />
          <Text style={styles.trendText}>
            {totalCount}{' '}
            {totalCount === 1 ? 'sesión total' : 'sesiones totales'}
          </Text>
        </View>
      </View>

      <View style={styles.ringContainer}>
        <Svg width={100} height={100}>
          <Circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            stroke={COLORS.surfaceVariant}
            strokeWidth={7}
            fill="transparent"
          />
          <Circle
            cx="50"
            cy="50"
            r={RING_RADIUS}
            stroke={COLORS.primary}
            strokeWidth={7}
            fill="transparent"
            strokeDasharray={`${CIRCUMFERENCE}`}
            strokeDashoffset={`${strokeOffset}`}
            strokeLinecap="round"
            rotation="-90"
            origin="50,50"
          />
        </Svg>
        <Text style={styles.ringText}>{Math.round(progress)}%</Text>
      </View>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    progressCard: {
      backgroundColor: COLORS.surfaceContainerLowest,
      borderRadius: RADIUS.xxl,
      padding: 24,
      marginBottom: 28,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      ...SHADOWS.lg,
      overflow: 'hidden',
    },
    progressCopy: {
      zIndex: 1,
      flex: 1,
    },
    progressLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: COLORS.primary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 4,
    },
    progressTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: COLORS.onSurface,
    },
    trendBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      backgroundColor: COLORS.secondaryContainer + '30',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: RADIUS.round,
      alignSelf: 'flex-start',
      marginTop: 12,
    },
    trendText: {
      fontSize: 12,
      fontWeight: '700',
      color: COLORS.onSecondaryContainer,
    },
    ringContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    ringText: {
      position: 'absolute',
      fontSize: 20,
      fontWeight: '800',
      color: COLORS.onSurface,
    },
  });
