import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { getSessions } from '../storage/asyncStorage';
import type { Session } from '../storage/asyncStorage';
import SessionCard from '../components/SessionCard';
import StatCard from '../components/StatCard';

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default function DashboardScreen({ navigation }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getSessions();
        setSessions(data);
      };
      load();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <Text style={styles.greetTitle}>¡Hola, Estudiante! 👋</Text>
          <Text style={styles.greetSub}>
            ¡Sigue así, estás cerca de tus objetivos!
          </Text>
        </View>

        <View style={styles.progressCard}>
          <View style={{ zIndex: 1, flex: 1 }}>
            <Text style={styles.progressLabel}>Tu progreso hoy</Text>
            <Text style={styles.progressTitle}>Excelente ritmo</Text>
            <View style={styles.trendBadge}>
              <MaterialIcons
                name="trending-up"
                size={14}
                color={COLORS.onSecondaryContainer}
              />
              <Text style={styles.trendText}>+15% que ayer</Text>
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
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * 0.35}`}
                strokeLinecap="round"
                rotation="-90"
                origin="50,50"
              />
            </Svg>
            <Text style={styles.ringText}>65%</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Próximas Sesiones</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todo</Text>
          </TouchableOpacity>
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
            icon="timer"
            iconColor={COLORS.primary}
            value="4.5h"
            label="Tiempo Total"
          />
          <View style={{ width: 16 }} />
          <StatCard
            icon="local-fire-department"
            iconColor={COLORS.tertiary}
            value="12"
            label="Racha Días"
          />
        </View>
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
});
