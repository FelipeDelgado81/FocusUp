import React, { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RADIUS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface MetricTileProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  label: string;
  value: string | number;
  labelColor?: string;
  valueColor?: string;
  style?: StyleProp<ViewStyle>;
}

export default function MetricTile({
  icon,
  iconColor,
  label,
  value,
  labelColor,
  valueColor,
  style,
}: MetricTileProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={[styles.statTile, style]}>
      <MaterialIcons name={icon} size={28} color={iconColor} />
      <View>
        <Text
          style={[styles.statLabel, { color: labelColor ?? COLORS.outline }]}
        >
          {label}
        </Text>
        <Text
          style={[styles.statValue, { color: valueColor ?? COLORS.onSurface }]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    statTile: {
      flex: 1,
      backgroundColor: COLORS.surfaceContainerLowest,
      borderRadius: RADIUS.xxl,
      padding: 20,
      height: 120,
      justifyContent: 'space-between',
    },
    statLabel: {
      fontSize: 10,
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    statValue: {
      fontSize: 28,
      fontWeight: '800',
      marginTop: 2,
    },
  });
