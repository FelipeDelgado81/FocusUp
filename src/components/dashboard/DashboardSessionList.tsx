import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import type { Session } from '../../hooks/useSessions';
import SessionCard from '../SessionCard';

interface DashboardSessionListProps {
  sessions: Session[];
}

export default function DashboardSessionList({
  sessions,
}: DashboardSessionListProps) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Próximas Sesiones</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sessionsScroll}
      >
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.onBackground,
  },
  sessionsScroll: {
    gap: 14,
    paddingBottom: 8,
  },
});
