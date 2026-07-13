import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AgendaCalendar from '../components/agenda/AgendaCalendar';
import AgendaSessionItem from '../components/agenda/AgendaSessionItem';
import {
  EmptyDaySessions,
  SessionsDayHeader,
} from '../components/agenda/AgendaSections';
import FloatingAddButton from '../components/FloatingAddButton';
import { COLORS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp } from '../navigation/types';
import { formatDateKey } from '../utils/date';
import { getMonthLabel, getWeekDates, isSameDay } from '../utils/agenda';

export default function AgendaScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { sessions, remove, complete } = useSessions();
  const [weekOffset, setWeekOffset] = useState(0);

  const referenceDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + weekOffset * 7);
    return date;
  }, [weekOffset]);

  const weekDates = useMemo(() => getWeekDates(referenceDate), [referenceDate]);
  const todayIndex = useMemo(() => {
    const today = new Date();
    return weekDates.findIndex((date) => isSameDay(date, today));
  }, [weekDates]);

  const [selectedDayIndex, setSelectedDayIndex] = useState(
    todayIndex >= 0 ? todayIndex : 0,
  );

  const selectedDateKey = formatDateKey(weekDates[selectedDayIndex]);
  const daySessions = useMemo(
    () => sessions.filter((session) => session.date === selectedDateKey),
    [selectedDateKey, sessions],
  );

  const changeWeek = (direction: -1 | 1) => {
    setWeekOffset((value) => value + direction);
    setSelectedDayIndex(0);
  };

  const goToToday = () => {
    const currentWeek = getWeekDates(new Date());
    const currentTodayIndex = currentWeek.findIndex((date) =>
      isSameDay(date, new Date()),
    );
    setWeekOffset(0);
    setSelectedDayIndex(currentTodayIndex >= 0 ? currentTodayIndex : 0);
  };

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

  const handleComplete = (id: string) => {
    Alert.alert('Completar sesión', '¿Registrar esta sesión como estudiada?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Completar',
        onPress: () => complete(id),
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
          <Text style={styles.subtitle}>Organiza tu flujo de aprendizaje</Text>
        </View>

        <AgendaCalendar
          monthLabel={getMonthLabel(referenceDate)}
          weekDates={weekDates}
          selectedDayIndex={selectedDayIndex}
          onSelectDay={setSelectedDayIndex}
          onPrevWeek={() => changeWeek(-1)}
          onToday={goToToday}
          onNextWeek={() => changeWeek(1)}
        />

        <SessionsDayHeader count={daySessions.length} />

        {daySessions.length > 0 ? (
          daySessions.map((session) => (
            <AgendaSessionItem
              key={session.id}
              session={session}
              onEdit={(sessionId) =>
                navigation.navigate('NuevaSesion', { sessionId })
              }
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))
        ) : (
          <EmptyDaySessions />
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
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },
});
