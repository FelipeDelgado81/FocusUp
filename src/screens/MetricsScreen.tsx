import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import { useTasks } from '../hooks/useTasks';

const DAY_LABELS: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const SUBJECT_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Matemáticas: 'calculate',
  'Matemáticas Avanzadas': 'calculate',
  Historia: 'history-edu',
  'Historia Universal': 'history-edu',
  Programación: 'code',
  Biología: 'biotech',
  'Biología Molecular': 'biotech',
  default: 'book',
};

const SUBJECT_COLORS_LIST = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.tertiary,
  COLORS.primaryContainer,
  COLORS.tertiaryContainer,
];

interface SubjectStat {
  name: string;
  count: number;
  percent: number;
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

function getWeeklyData(sessions: ReturnType<typeof useSessions>['sessions']): number[] {
  const now = new Date();
  const startOfWeek = new Date(now);
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const counts: number[] = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const dateStr = day.toISOString().split('T')[0];
    counts[i] = sessions.filter((s) => s.date === dateStr).length;
  }

  const max = Math.max(...counts, 1);
  return counts.map((c) => Math.round((c / max) * 100));
}

function getSubjectStats(sessions: ReturnType<typeof useSessions>['sessions']): SubjectStat[] {
  const subjectCount: Record<string, number> = {};

  for (const session of sessions) {
    subjectCount[session.subject] = (subjectCount[session.subject] || 0) + 1;
  }

  const total = sessions.length || 1;
  const sorted = Object.entries(subjectCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return sorted.map(([name, count], i) => ({
    name,
    count,
    percent: Math.round((count / total) * 100),
    color: SUBJECT_COLORS_LIST[i % SUBJECT_COLORS_LIST.length],
    icon: SUBJECT_ICONS[name] || SUBJECT_ICONS.default,
  }));
}

function getStreak(sessions: ReturnType<typeof useSessions>['sessions']): number {
  if (sessions.length === 0) return 0;

  const dates = [...new Set(sessions.map((s) => s.date))].sort().reverse();
  let streak = 0;
  let expected = new Date();

  for (const dateStr of dates) {
    const expectedStr = expected.toISOString().split('T')[0];
    if (dateStr === expectedStr) {
      streak++;
      expected.setDate(expected.getDate() - 1);
    } else if (dateStr < expectedStr) {
      break;
    }
  }

  return streak;
}

export default function MetricsScreen() {
  const { sessions } = useSessions();
  const { tasks } = useTasks();

  const weeklyData = getWeeklyData(sessions);
  const subjectStats = getSubjectStats(sessions);
  const streak = getStreak(sessions);
  const totalSessions = sessions.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const today = new Date().toISOString().split('T')[0];
  const todaySessions = sessions.filter((s) => s.date === today).length;
  const maxWeekly = Math.max(...weeklyData, 1);

  if (sessions.length === 0 && tasks.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Tu Rendimiento</Text>
            <Text style={styles.subtitle}>
              Aquí verás tus estadísticas de estudio.
            </Text>
          </View>
          <View style={styles.emptyState}>
            <MaterialIcons
              name="bar-chart"
              size={64}
              color={COLORS.outlineVariant}
            />
            <Text style={styles.emptyTitle}>Sin datos aún</Text>
            <Text style={styles.emptySub}>
              Crea sesiones de estudio para empezar a ver tu progreso
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tu Rendimiento</Text>
          <Text style={styles.subtitle}>
            {totalSessions} {totalSessions === 1 ? 'sesión registrada' : 'sesiones registradas'}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            <View
              style={[
                styles.statTile,
                { borderBottomWidth: 4, borderBottomColor: COLORS.primary },
              ]}
            >
              <MaterialIcons name="event-note" size={28} color={COLORS.primary} />
              <View style={styles.statBottom}>
                <Text style={styles.statLabel}>Total sesiones</Text>
                <Text style={styles.statValue}>{totalSessions}</Text>
              </View>
            </View>
            <View
              style={[
                styles.statTile,
                { backgroundColor: COLORS.tertiaryFixed },
              ]}
            >
              <MaterialIcons
                name="local-fire-department"
                size={28}
                color={COLORS.tertiary}
              />
              <View style={styles.statBottom}>
                <Text
                  style={[styles.statLabel, { color: COLORS.onTertiaryFixed }]}
                >
                  Racha
                </Text>
                <Text
                  style={[styles.statValue, { color: COLORS.onTertiaryFixed }]}
                >
                  {streak} {streak === 1 ? 'día' : 'días'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View
              style={[
                styles.statTile,
                { borderBottomWidth: 4, borderBottomColor: COLORS.secondary },
              ]}
            >
              <MaterialIcons name="today" size={28} color={COLORS.secondary} />
              <View style={styles.statBottom}>
                <Text style={styles.statLabel}>Hoy</Text>
                <Text style={styles.statValue}>{todaySessions}</Text>
              </View>
            </View>
            <View
              style={[
                styles.statTile,
                { backgroundColor: COLORS.primaryFixed },
              ]}
            >
              <MaterialIcons
                name="task-alt"
                size={28}
                color={COLORS.primary}
              />
              <View style={styles.statBottom}>
                <Text
                  style={[styles.statLabel, { color: COLORS.onPrimaryFixed }]}
                >
                  Completadas
                </Text>
                <Text
                  style={[styles.statValue, { color: COLORS.onPrimaryFixed }]}
                >
                  {completedTasks}
                </Text>
              </View>
            </View>
          </View>

          {streak > 0 && (
            <View style={styles.progressBanner}>
              <View style={styles.progressIcon}>
                <MaterialIcons
                  name="trending-up"
                  size={24}
                  color={COLORS.secondary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.progressTitle}>¡Buena racha!</Text>
                <Text style={styles.progressDesc}>
                  {streak} {streak === 1 ? 'día consecutivo estudiando' : 'días consecutivos estudiando'}
                </Text>
              </View>
            </View>
          )}
        </View>

        {weeklyData.some((v) => v > 0) && (
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Esta semana</Text>
            <View style={styles.barsContainer}>
              {weeklyData.map((h, i) => (
                <View key={i} style={styles.barColumn}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${h}%`,
                          backgroundColor:
                            h === maxWeekly
                              ? COLORS.primary
                              : h > 0
                                ? COLORS.primaryFixedDim
                                : COLORS.surfaceVariant,
                        },
                        h === maxWeekly && {
                          ...SHADOWS.sm,
                          shadowColor: COLORS.primary,
                        },
                      ]}
                    />
                  </View>
                  <Text
                    style={[
                      styles.barLabel,
                      h === maxWeekly && { color: COLORS.primary },
                    ]}
                  >
                    {DAY_LABELS[i]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {subjectStats.length > 0 && (
          <>
            <Text style={styles.subjectTitle}>Asignaturas</Text>
            {subjectStats.map((sub) => (
              <View key={sub.name} style={styles.subjectCard}>
                <View style={styles.subjectLeft}>
                  <View
                    style={[styles.subjectIcon, { backgroundColor: sub.color + '20' }]}
                  >
                    <MaterialIcons
                      name={sub.icon}
                      size={20}
                      color={sub.color}
                    />
                  </View>
                  <View>
                    <Text style={styles.subjectName}>{sub.name}</Text>
                    <Text style={styles.subjectHours}>
                      {sub.count} {sub.count === 1 ? 'sesión' : 'sesiones'}
                    </Text>
                  </View>
                </View>
                <View style={styles.subjectRight}>
                  <Text style={[styles.subjectPercent, { color: sub.color }]}>
                    {sub.percent}%
                  </Text>
                  <View style={styles.subjectBarTrack}>
                    <View
                      style={[
                        styles.subjectBar,
                        {
                          width: `${sub.percent}%`,
                          backgroundColor: sub.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: COLORS.onBackground,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
    marginTop: 6,
  },
  statsGrid: {
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  statTile: {
    flex: 1,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xxl,
    padding: 20,
    height: 120,
    justifyContent: 'space-between',
  },
  statBottom: {},
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.outline,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.onSurface,
    marginTop: 2,
  },
  progressBanner: {
    backgroundColor: COLORS.secondaryContainer,
    borderRadius: RADIUS.xxl,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.onSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
  },
  progressDesc: {
    fontSize: 13,
    color: COLORS.onSecondaryContainer + 'cc',
    marginTop: 2,
  },
  chartCard: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.xxl,
    padding: 24,
    marginBottom: 28,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 16,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingHorizontal: 8,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  barTrack: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: 28,
    borderRadius: RADIUS.round,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.outline,
  },
  subjectTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  subjectCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 16,
    borderRadius: RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subjectLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  subjectIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  subjectHours: {
    fontSize: 12,
    color: COLORS.outline,
    fontWeight: '500',
    marginTop: 2,
  },
  subjectRight: {
    alignItems: 'flex-end',
  },
  subjectPercent: {
    fontSize: 16,
    fontWeight: '700',
  },
  subjectBarTrack: {
    width: 60,
    height: 6,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: RADIUS.round,
    marginTop: 4,
    overflow: 'hidden',
  },
  subjectBar: {
    height: '100%',
    borderRadius: RADIUS.round,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },
});
