import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import type { Session } from '../storage/asyncStorage';

const SUBJECT_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Matemáticas: 'calculate',
  Historia: 'history-edu',
  Programación: 'code',
  default: 'book',
};

const PRIORITY_COLORS: Record<string, string> = {
  ALTA: COLORS.primary,
  MEDIA: COLORS.tertiary,
  BAJA: COLORS.secondary,
};

const PRIORITY_BG: Record<string, string> = {
  ALTA: COLORS.primaryFixed,
  MEDIA: COLORS.tertiaryFixed,
  BAJA: COLORS.secondaryFixed,
};

interface Props {
  session: Session;
  compact?: boolean;
}

export default function SessionCard({ session, compact = false }: Props) {
  const iconName = SUBJECT_ICONS[session.subject] || SUBJECT_ICONS.default;
  const borderColor = PRIORITY_COLORS[session.priority] || COLORS.primary;
  const iconBg = PRIORITY_BG[session.priority] || COLORS.primaryFixed;

  return (
    <View
      style={[
        styles.card,
        compact && styles.cardCompact,
        { borderBottomColor: borderColor, borderBottomWidth: 4 },
      ]}
    >
      <View style={[styles.iconContainer, { backgroundColor: iconBg }]}>
        <MaterialIcons name={iconName} size={22} color={COLORS.onSurface} />
      </View>
      <Text style={styles.subject} numberOfLines={1}>
        {session.subject}
      </Text>
      <Text style={styles.topic} numberOfLines={1}>
        {session.topic}
      </Text>
      <View style={styles.timeRow}>
        <MaterialIcons
          name="schedule"
          size={14}
          color={COLORS.onSurfaceVariant}
        />
        <Text style={styles.timeText}>
          {session.startTime} - {session.endTime}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    padding: 16,
    width: 180,
    ...SHADOWS.sm,
  },
  cardCompact: {
    width: 160,
    padding: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  subject: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 4,
  },
  topic: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
});
