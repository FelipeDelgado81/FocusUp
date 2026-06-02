import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RADIUS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface StreakBannerProps {
  streak: number;
}

export default function StreakBanner({ streak }: StreakBannerProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  if (streak <= 0) return null;

  return (
    <View style={styles.progressBanner}>
      <View style={styles.progressIcon}>
        <MaterialIcons name="trending-up" size={24} color={COLORS.secondary} />
      </View>
      <View style={styles.copy}>
        <Text style={styles.progressTitle}>¡Buena racha!</Text>
        <Text style={styles.progressDesc}>
          {streak}{' '}
          {streak === 1
            ? 'día consecutivo estudiando'
            : 'días consecutivos estudiando'}
        </Text>
      </View>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    progressBanner: {
      backgroundColor: COLORS.secondaryContainer,
      borderRadius: RADIUS.xxl,
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
    },
    progressIcon: {
      width: 48,
      height: 48,
      borderRadius: RADIUS.lg,
      backgroundColor: COLORS.onSecondary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    copy: {
      flex: 1,
    },
    progressTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: COLORS.onSecondaryContainer,
    },
    progressDesc: {
      fontSize: 13,
      color: COLORS.onSecondaryContainer + 'cc',
      marginTop: 2,
    },
  });
