import React from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';

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
  labelColor = COLORS.outline,
  valueColor = COLORS.onSurface,
  style,
}: MetricTileProps) {
  return (
    <View style={[styles.statTile, style]}>
      <MaterialIcons name={icon} size={28} color={iconColor} />
      <View>
        <Text style={[styles.statLabel, { color: labelColor }]}>{label}</Text>
        <Text style={[styles.statValue, { color: valueColor }]}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
