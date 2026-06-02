import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface DashboardGreetingProps {
  title: string;
  subtitle: string;
}

export default function DashboardGreeting({
  title,
  subtitle,
}: DashboardGreetingProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.greeting}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    greeting: {
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      color: COLORS.onBackground,
    },
    subtitle: {
      fontSize: 14,
      color: COLORS.onSurfaceVariant,
      marginTop: 4,
    },
  });
