import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../constants/theme';

type Priority = 'ALTA' | 'MEDIA' | 'BAJA';

const PRIORITY_STYLES: Record<
  Priority,
  { bg: string; text: string }
> = {
  ALTA: { bg: COLORS.errorContainer, text: COLORS.onErrorContainer },
  MEDIA: { bg: COLORS.surfaceContainerHigh, text: COLORS.onSurfaceVariant },
  BAJA: { bg: COLORS.surfaceContainerLow, text: COLORS.onSurfaceVariant },
};

interface Props {
  priority: Priority;
}

export default function PriorityBadge({ priority }: Props) {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.BAJA;

  return (
    <View style={[styles.badge, { backgroundColor: style.bg }]}>
      <Text style={[styles.text, { color: style.text }]}>{priority}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
