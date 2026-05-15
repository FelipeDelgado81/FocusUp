import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';
import type { Session } from '../../hooks/useSessions';

interface FocusSessionSelectorProps {
  sessions: Session[];
  selectedSession?: Session;
  onNextSession: () => void;
}

export default function FocusSessionSelector({
  sessions,
  selectedSession,
  onNextSession,
}: FocusSessionSelectorProps) {
  if (sessions.length === 0) {
    return (
      <View style={styles.noSessionBadge}>
        <MaterialIcons
          name="info-outline"
          size={16}
          color={COLORS.onSurfaceVariant}
        />
        <Text style={styles.noSessionText}>No hay sesiones para hoy</Text>
      </View>
    );
  }

  return (
    <View style={styles.sessionSelector}>
      <TouchableOpacity style={styles.selectorBtn} onPress={onNextSession}>
        <MaterialIcons name="chevron-left" size={20} color={COLORS.primary} />
        <Text style={styles.selectorText} numberOfLines={1}>
          {selectedSession
            ? `${selectedSession.subject} - ${selectedSession.topic}`
            : 'Selecciona sesión'}
        </Text>
        <MaterialIcons name="chevron-right" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sessionSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADIUS.round,
    maxWidth: 280,
  },
  selectorText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
    flex: 1,
    textAlign: 'center',
  },
  noSessionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
  },
  noSessionText: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
  },
});
