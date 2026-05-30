import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MetricsEmptyState from '../components/metrics/MetricsEmptyState';
import MetricsHeader from '../components/metrics/MetricsHeader';
import MetricsStatsGrid from '../components/metrics/MetricsStatsGrid';
import StreakBanner from '../components/metrics/StreakBanner';
import SubjectStatsList from '../components/metrics/SubjectStatsList';
import WeeklyChart from '../components/metrics/WeeklyChart';
import { COLORS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import { useTasks } from '../hooks/useTasks';
import { getMetricsSummary } from '../utils/metrics';

export default function MetricsScreen() {
  const { sessions } = useSessions();
  const { tasks } = useTasks();

  const metrics = useMemo(
    () => getMetricsSummary(sessions, tasks),
    [sessions, tasks],
  );
  const isEmpty = sessions.length === 0 && tasks.length === 0;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <MetricsHeader
          totalSessions={metrics.totalSessions}
          subtitle={
            isEmpty ? 'Aquí verás tus estadísticas de estudio.' : undefined
          }
        />

        {isEmpty ? (
          <MetricsEmptyState />
        ) : (
          <>
            <View>
              <MetricsStatsGrid
                totalSessions={metrics.totalSessions}
                todaySessions={metrics.todaySessions}
                completedTasks={metrics.completedTasks}
                streak={metrics.streak}
                totalStudyMinutes={metrics.totalStudyMinutes}
              />
              <StreakBanner streak={metrics.streak} />
            </View>

            <WeeklyChart data={metrics.weeklyData} />
            <SubjectStatsList subjects={metrics.subjectStats} />
          </>
        )}
      </ScrollView>
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
    paddingTop: 16,
    paddingBottom: 100,
  },
});
