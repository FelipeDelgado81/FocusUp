import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import StatCard from '../components/StatCard';

const WEEKLY_DATA = [40, 65, 90, 55, 75, 30, 20];
const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

const SUBJECTS = [
  { name: 'Matemáticas Avanzadas', hours: 18, percent: 45, color: 'primary', icon: 'calculate' },
  { name: 'Biología Molecular', hours: 12, percent: 30, color: 'secondary', icon: 'biotech' },
  { name: 'Historia Universal', hours: 10, percent: 25, color: 'tertiary', icon: 'history-edu' },
];

const SUBJECT_COLORS = {
  primary: { text: COLORS.primary, bg: COLORS.primaryFixed, bar: COLORS.primary },
  secondary: { text: COLORS.secondary, bg: COLORS.secondaryFixed, bar: COLORS.secondary },
  tertiary: { text: COLORS.tertiary, bg: COLORS.tertiaryFixed, bar: COLORS.tertiary },
};

export default function MetricsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Tu Rendimiento</Text>
          <Text style={styles.subtitle}>
            Analizando tus patrones de éxito semanal.
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statsRow}>
            {/* Total hours */}
            <View style={[styles.statTile, { borderBottomWidth: 4, borderBottomColor: COLORS.primary }]}>
              <MaterialIcons name="schedule" size={28} color={COLORS.primary} />
              <View style={styles.statBottom}>
                <Text style={styles.statLabel}>Total de horas</Text>
                <Text style={styles.statValue}>42h</Text>
              </View>
            </View>
            {/* Streak */}
            <View style={[styles.statTile, { backgroundColor: COLORS.tertiaryFixed }]}>
              <MaterialIcons name="local-fire-department" size={28} color={COLORS.tertiary} />
              <View style={styles.statBottom}>
                <Text style={[styles.statLabel, { color: COLORS.onTertiaryFixed }]}>
                  Racha actual
                </Text>
                <Text style={[styles.statValue, { color: COLORS.onTertiaryFixed }]}>
                  7 días
                </Text>
              </View>
            </View>
          </View>

          {/* Progress Banner */}
          <View style={styles.progressBanner}>
            <View style={styles.progressIcon}>
              <MaterialIcons name="trending-up" size={24} color={COLORS.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.progressTitle}>Progreso Imparable</Text>
              <Text style={styles.progressDesc}>
                Has estudiado un 15% más que la semana pasada
              </Text>
            </View>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.chartCard}>
          <View style={styles.barsContainer}>
            {WEEKLY_DATA.map((h, i) => (
              <View key={i} style={styles.barColumn}>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: `${h}%`,
                        backgroundColor:
                          i === 2
                            ? COLORS.primary
                            : i > 4
                            ? COLORS.tertiaryFixedDim
                            : COLORS.surfaceVariant,
                      },
                      i === 2 && {
                        ...SHADOWS.sm,
                        shadowColor: COLORS.primary,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.barLabel,
                    i === 2 && { color: COLORS.primary },
                  ]}
                >
                  {DAY_LABELS[i]}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.chartFooter}>
            <Text style={styles.chartFooterText}>Sesión más larga: 6.5h</Text>
            <Text style={styles.chartFooterLink}>Ver detalles</Text>
          </View>
        </View>

        {/* Subject List */}
        <Text style={styles.subjectTitle}>Asignaturas más estudiadas</Text>
        {SUBJECTS.map((sub) => {
          const colors = SUBJECT_COLORS[sub.color];
          return (
            <View key={sub.name} style={styles.subjectCard}>
              <View style={styles.subjectLeft}>
                <View style={[styles.subjectIcon, { backgroundColor: colors.bg }]}>
                  <MaterialIcons name={sub.icon} size={20} color={colors.text} />
                </View>
                <View>
                  <Text style={styles.subjectName}>{sub.name}</Text>
                  <Text style={styles.subjectHours}>{sub.hours} horas totales</Text>
                </View>
              </View>
              <View style={styles.subjectRight}>
                <Text style={[styles.subjectPercent, { color: colors.text }]}>
                  {sub.percent}%
                </Text>
                <View style={styles.subjectBarTrack}>
                  <View
                    style={[
                      styles.subjectBar,
                      { width: `${sub.percent}%`, backgroundColor: colors.bar },
                    ]}
                  />
                </View>
              </View>
            </View>
          );
        })}
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
  // Stats Grid
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
    height: 150,
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
  // Chart
  chartCard: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.xxl,
    padding: 24,
    marginBottom: 28,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    marginBottom: 16,
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
  chartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  chartFooterText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  chartFooterLink: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  // Subjects
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
});
