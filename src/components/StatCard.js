import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../constants/theme';

export default function StatCard({ icon, iconColor, value, label, style }) {
  return (
    <View style={[styles.card, style]}>
      <MaterialIcons
        name={icon}
        size={24}
        color={iconColor || COLORS.primary}
      />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLow,
    padding: 20,
    borderRadius: RADIUS.xxl,
    flex: 1,
  },
  value: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginTop: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 2,
  },
});
