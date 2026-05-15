import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp } from '../navigation/types';
import PriorityBadge from '../components/PriorityBadge';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const SUBJECT_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Matemáticas: 'functions',
  Historia: 'history-edu',
  Programación: 'terminal',
  default: 'book',
};

const PRIORITY_ICON_BG: Record<string, string> = {
  ALTA: COLORS.primaryFixed,
  MEDIA: COLORS.secondaryContainer + '50',
  BAJA: COLORS.tertiaryFixed,
};

const PRIORITY_ICON_COLOR: Record<string, string> = {
  ALTA: COLORS.onPrimaryFixedVariant,
  MEDIA: COLORS.onSecondaryContainer,
  BAJA: COLORS.onTertiaryFixedVariant,
};

function getWeekDates(referenceDate: Date): Date[] {
  const dayOfWeek = referenceDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return date;
  });
}

function formatDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

function isSameDay(a: Date, b: Date): boolean {
  return formatDateKey(a) === formatDateKey(b);
}

export default function AgendaScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { sessions, loading, refresh, remove } = useSessions();
  const [weekOffset, setWeekOffset] = useState(0);

  const referenceDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + weekOffset * 7);
    return date;
  }, [weekOffset]);

  const weekDates = useMemo(() => getWeekDates(referenceDate), [referenceDate]);

  const todayIndex = useMemo(() => {
    const today = new Date();
    return weekDates.findIndex((d) => isSameDay(d, today));
  }, [weekDates]);

  const [selectedDayIndex, setSelectedDayIndex] = useState(
    todayIndex >= 0 ? todayIndex : 0,
  );

  const selectedDate = weekDates[selectedDayIndex];
  const selectedDateKey = formatDateKey(selectedDate);

  const daySessions = useMemo(
    () => sessions.filter((s) => s.date === selectedDateKey),
    [sessions, selectedDateKey],
  );

  const monthLabel = `${MONTH_NAMES[referenceDate.getMonth()]} ${referenceDate.getFullYear()}`;

  const handleDelete = (id: string) => {
    Alert.alert('Eliminar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => remove(id),
      },
    ]);
  };

  const handleEdit = (sessionId: string) => {
    navigation.navigate('NuevaSesion', { sessionId });
  };

  const goToPrevWeek = () => {
    setWeekOffset((prev) => prev - 1);
    setSelectedDayIndex(0);
  };

  const goToNextWeek = () => {
    setWeekOffset((prev) => prev + 1);
    setSelectedDayIndex(0);
  };

  const goToToday = () => {
    setWeekOffset(0);
    const today = new Date();
    const idx = weekDates.findIndex((d) => isSameDay(d, today));
    setSelectedDayIndex(idx >= 0 ? idx : 0);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Mi Agenda de Estudio</Text>
          <Text style={styles.subtitle}>
            Organiza tu flujo de aprendizaje
          </Text>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthLabel}>{monthLabel}</Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity onPress={goToPrevWeek}>
                <MaterialIcons
                  name="chevron-left"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={goToToday}>
                <Text style={styles.todayBtn}>Hoy</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={goToNextWeek}>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.daysRow}>
            {weekDates.map((date, i) => {
              const isSelected = i === selectedDayIndex;
              const isToday = isSameDay(date, new Date());
              return (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.dayCell,
                    isSelected && styles.dayCellSelected,
                  ]}
                  onPress={() => setSelectedDayIndex(i)}
                >
                  <Text
                    style={[
                      styles.dayLabel,
                      isSelected && styles.dayLabelSelected,
                    ]}
                  >
                    {DAYS[i]}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.dayNumberSelected,
                      isToday && !isSelected && styles.dayNumberToday,
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                  {(isSelected || isToday) && (
                    <View
                      style={[
                        styles.dayDot,
                        isToday && !isSelected && styles.dayDotToday,
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sessionsHeader}>
          <Text style={styles.sessionsLabel}>Sesiones del día</Text>
          <Text style={styles.sessionsCount}>
            {daySessions.length} {daySessions.length === 1 ? 'sesión' : 'sesiones'}
          </Text>
        </View>

        {daySessions.length > 0 ? (
          daySessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <View style={styles.sessionTop}>
                <View style={styles.sessionInfo}>
                  <View
                    style={[
                      styles.sessionIcon,
                      {
                        backgroundColor:
                          PRIORITY_ICON_BG[session.priority] ||
                          COLORS.primaryFixed,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name={
                        SUBJECT_ICONS[session.subject] || SUBJECT_ICONS.default
                      }
                      size={22}
                      color={
                        PRIORITY_ICON_COLOR[session.priority] || COLORS.onSurface
                      }
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sessionTitle}>
                      {session.subject} {session.topic}
                    </Text>
                    <View style={styles.sessionTime}>
                      <MaterialIcons
                        name="schedule"
                        size={14}
                        color={COLORS.onSurfaceVariant}
                      />
                      <Text style={styles.sessionTimeText}>
                        {session.startTime} - {session.endTime}
                      </Text>
                    </View>
                    {session.location && (
                      <View style={styles.locationRow}>
                        <MaterialIcons
                          name="place"
                          size={14}
                          color={COLORS.onSurfaceVariant}
                        />
                        <Text style={styles.locationText}>{session.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
                <PriorityBadge priority={session.priority as 'ALTA' | 'MEDIA' | 'BAJA'} />
              </View>
              <View style={styles.sessionBottom}>
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleEdit(session.id)}
                  >
                    <MaterialIcons
                      name="edit"
                      size={18}
                      color={COLORS.onSurfaceVariant}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(session.id)}
                  >
                    <MaterialIcons
                      name="delete"
                      size={18}
                      color={COLORS.error}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="event-available"
              size={48}
              color={COLORS.outlineVariant}
            />
            <Text style={styles.emptyTitle}>Sin sesiones</Text>
            <Text style={styles.emptySub}>
              No hay sesiones programadas para este día
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.onBackground,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
  calendarCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xxl,
    padding: 16,
    marginBottom: 24,
    ...SHADOWS.sm,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 6,
  },
  monthLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  calendarNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  todayBtn: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
    gap: 6,
  },
  dayCellSelected: {
    backgroundColor: COLORS.primary,
    ...SHADOWS.md,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: COLORS.onSurfaceVariant,
  },
  dayLabelSelected: {
    color: COLORS.onPrimary + 'cc',
  },
  dayNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  dayNumberSelected: {
    color: COLORS.onPrimary,
    fontWeight: '700',
  },
  dayNumberToday: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white,
  },
  dayDotToday: {
    backgroundColor: COLORS.primary,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 6,
  },
  sessionsLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  sessionsCount: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.primary,
  },
  sessionCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xxl,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer + '20',
  },
  sessionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  sessionInfo: {
    flexDirection: 'row',
    gap: 14,
    flex: 1,
    marginRight: 10,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sessionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 4,
  },
  sessionTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sessionTimeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  sessionBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceContainer + '20',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.onSurface,
  },
  emptySub: {
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    textAlign: 'center',
  },
});
