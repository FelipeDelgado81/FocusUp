import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import type { Session } from '../../hooks/useSessions';
import SessionCard from '../SessionCard';

interface DashboardSessionListProps {
  sessions: Session[];
}

export default function DashboardSessionList({
  sessions,
}: DashboardSessionListProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
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

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
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
