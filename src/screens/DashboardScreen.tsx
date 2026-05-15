import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import DashboardEmptyState from '../components/dashboard/DashboardEmptyState';
import DashboardGreeting from '../components/dashboard/DashboardGreeting';
import DashboardSessionList from '../components/dashboard/DashboardSessionList';
import DashboardStatsRow from '../components/dashboard/DashboardStatsRow';
import DailyProgressCard from '../components/dashboard/DailyProgressCard';
import FloatingAddButton from '../components/FloatingAddButton';
import { COLORS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp } from '../navigation/types';
import { getTodayDateKey } from '../utils/date';
import { getDailyProgress, getGreetingMessage } from '../utils/dashboard';

export default function DashboardScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { sessions, loading } = useSessions();
  const today = getTodayDateKey();

  const todayCount = useMemo(
    () => sessions.filter((session) => session.date === today).length,
    [sessions, today],
  );
  const totalCount = sessions.length;
  const progress = useMemo(() => getDailyProgress(todayCount), [todayCount]);
  const greeting = getGreetingMessage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <DashboardGreeting
          title={greeting.title}
          subtitle={greeting.subtitle}
        />

        {loading ? (
          <DashboardEmptyState icon="hourglass-empty" title="Cargando..." />
        ) : totalCount > 0 ? (
          <>
            <DailyProgressCard
              todayCount={todayCount}
              totalCount={totalCount}
              progress={progress}
            />
            <DashboardSessionList sessions={sessions} />
            <DashboardStatsRow
              totalCount={totalCount}
              todayCount={todayCount}
            />
          </>
        ) : (
          <DashboardEmptyState
            icon="event-available"
            title="No hay sesiones aún"
            subtitle="Crea tu primera sesión de estudio para empezar"
          />
        )}
      </ScrollView>

      <FloatingAddButton onPress={() => navigation.navigate('NuevaSesion')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100,
  },
});
