import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { getSessions, deleteSession } from '../storage/asyncStorage';
import type { Session } from '../storage/asyncStorage';
import PriorityBadge from '../components/PriorityBadge';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

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

interface Props {
  navigation: { navigate: (screen: string) => void };
}

export default function AgendaScreen({ navigation }: Props) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const selectedDay = 1;

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getSessions();
        setSessions(data);
      };
      load();
    }, []),
  );

  const handleDelete = async (id: string) => {
    Alert.alert('Eliminar sesión', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const updated = await deleteSession(id);
          setSessions(updated);
        },
      },
    ]);
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
            Organiza tu flujo de aprendizaje para hoy
          </Text>
        </View>

        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.monthLabel}>Octubre 2023</Text>
            <View style={styles.calendarNav}>
              <TouchableOpacity>
                <MaterialIcons
                  name="chevron-left"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="chevron-right"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.daysRow}>
            {DAYS.map((day, i) => {
              const isSelected = i === selectedDay;
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                >
                  <Text
                    style={[
                      styles.dayLabel,
                      isSelected && styles.dayLabelSelected,
                    ]}
                  >
                    {day}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      isSelected && styles.dayNumberSelected,
                    ]}
                  >
                    {16 + i}
                  </Text>
                  {isSelected && <View style={styles.dayDot} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sessionsHeader}>
          <Text style={styles.sessionsLabel}>Próximas Sesiones</Text>
          <Text style={styles.sessionsCount}>
            {sessions.length} sesiones hoy
          </Text>
        </View>

        {sessions.map((session) => (
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
                </View>
              </View>
              <PriorityBadge priority={session.priority as 'ALTA' | 'MEDIA' | 'BAJA'} />
            </View>
            <View style={styles.sessionBottom}>
              <View style={styles.locationRow}>
                <View
                  style={[
                    styles.locationDot,
                    {
                      backgroundColor:
                        session.priority === 'ALTA'
                          ? COLORS.primary
                          : session.priority === 'MEDIA'
                            ? COLORS.secondary
                            : COLORS.tertiary,
                    },
                  ]}
                />
                <Text style={styles.locationText}>Aula 402</Text>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionBtn}>
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
                    color={COLORS.onSurfaceVariant}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
    gap: 8,
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
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white,
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
  sessionBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
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
});
