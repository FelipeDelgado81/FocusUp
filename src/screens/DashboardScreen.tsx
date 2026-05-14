import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import SessionCard from '../components/SessionCard';
import StatCard from '../components/StatCard';

interface Props {
  navigation: { navigate: (screen: string) => void };
}

function getTodaySessionsCount(sessions: ReturnType<typeof useSessions>['sessions']): number {
  const today = new Date().toISOString().split('T')[0];
  return sessions.filter((s) => s.date === today).length;
}

function getTotalSessionsCount(sessions: ReturnType<typeof useSessions>['sessions']): number {
  return sessions.length;
}

function getProgressPercentage(sessions: ReturnType<typeof useSessions>['sessions']): number {
  const today = new Date().toISOString().split('T')[0];
  const todaySessions = sessions.filter((s) => s.date === today).length;
  if (todaySessions === 0) return 0;
  const target = 5;
  return Math.min((todaySessions / target) * 100, 100);
}

function getEmptyStateMessage(): { title: string; sub: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { title: '¡Buenos días!', sub: 'Empieza tu día con una sesión de estudio' };
  if (hour < 18) return { title: '¡Buenas tardes!', sub: '¿Listo para tu próxima sesión?' };
  return { title: '¡Buenas noches!', sub: 'Última oportunidad para estudiar hoy' };
}

export default function DashboardScreen({ navigation }: Props) {
  const { sessions, loading } = useSessions();

  const todayCount = getTodaySessionsCount(sessions);
  const totalCount = getTotalSessionsCount(sessions);
  const progress = getProgressPercentage(sessions);
  const circumference = 2 * Math.PI * 42;
  const strokeOffset = circumference * (1 - progress / 100);
  const emptyState = getEmptyStateMessage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <Text style={styles.greetTitle}>{emptyState.title}</Text>
          <Text style={styles.greetSub}>{emptyState.sub}</Text>
        </View>

        {totalCount > 0 ? (
          <>
            <View style={styles.progressCard}>
              <View style={{ zIndex: 1, flex: 1 }}>
                <Text style={styles.progressLabel}>Tu progreso hoy</Text>
                <Text style={styles.progressTitle}>
                  {todayCount} {todayCount === 1 ? 'sesión' : 'sesiones'}
                </Text>
                <View style={styles.trendBadge}>
                  <MaterialIcons
                    name="event-note"
                    size={14}
                    color={COLORS.onSecondaryContainer}
                  />
                  <Text style={styles.trendText}>
                    {totalCount} {totalCount === 1 ? 'sesión total' : 'sesiones totales'}
                  </Text>
                </View>
              </View>
              <View style={styles.ringContainer}>
                <Svg width={100} height={100}>
                  <Circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke={COLORS.surfaceVariant}
                    strokeWidth={7}
                    fill="transparent"
                  />
                  <Circle
                    cx="50"
                    cy="50"
                    r="42"
                    stroke={COLORS.primary}
                    strokeWidth={7}
                    fill="transparent"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${strokeOffset}`}
                    strokeLinecap="round"
                    rotation="-90"
                    origin="50,50"
                  />
                </Svg>
                <Text style={styles.ringText}>{Math.round(progress)}%</Text>
              </View>
            </View>

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

            <View style={styles.statsRow}>
              <StatCard
                icon="event-note"
                iconColor={COLORS.primary}
                value={totalCount.toString()}
                label="Sesiones"
              />
              <View style={{ width: 16 }} />
              <StatCard
                icon="today"
                iconColor={COLORS.tertiary}
                value={todayCount.toString()}
                label="Hoy"
              />
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="event-available"
              size={64}
              color={COLORS.outlineVariant}
            />
            <Text style={styles.emptyTitle}>No hay sesiones aún</Text>
            <Text style={styles.emptySub}>
              Crea tu primera sesión de estudio para empezar
            </Text>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('NuevaSesion')}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryContainer]}
          style={styles.fabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name="add" size={28} color={COLORS.onPrimary} />
        </LinearGradient>
      </TouchableOpacity>
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
  greeting: {
    marginBottom: 24,
  },
  greetTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.onBackground,
    letterSpacing: -0.5,
  },
  greetSub: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  progressCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xxl,
    padding: 24,
    marginBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.lg,
    overflow: 'hidden',
  },
  progressLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  progressTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.secondaryContainer + '30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.onSecondaryContainer,
  },
  ringContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringText: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.onSurface,
  },
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
  seeAll: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  sessionsScroll: {
    gap: 14,
    paddingBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 24,
    ...SHADOWS.primaryGlow,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
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
