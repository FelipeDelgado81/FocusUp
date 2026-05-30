import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import FocusControls from '../components/focus/FocusControls';
import FocusEmptyState from '../components/focus/FocusEmptyState';
import FocusSessionSelector from '../components/focus/FocusSessionSelector';
import FocusTimerRing from '../components/focus/FocusTimerRing';
import PomodoroSummaryCard from '../components/focus/PomodoroSummaryCard';
import { COLORS } from '../constants/theme';
import { usePomodoroTimer } from '../hooks/usePomodoroTimer';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp } from '../navigation/types';
import { getTodayDateKey } from '../utils/date';

const DEFAULT_FOCUS_MINUTES = 25;

export default function FocusZoneScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { sessions } = useSessions();
  const today = getTodayDateKey();

  const todaySessions = useMemo(
    () => sessions.filter((session) => session.date === today),
    [sessions, today],
  );

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    todaySessions[0]?.id ?? null,
  );

  const selectedSession = todaySessions.find(
    (session) => session.id === selectedSessionId,
  );

  const timer = usePomodoroTimer({ focusMinutes: DEFAULT_FOCUS_MINUTES });

  useEffect(() => {
    if (todaySessions.length === 0) {
      setSelectedSessionId(null);
      return;
    }

    const selectedStillExists = todaySessions.some(
      (session) => session.id === selectedSessionId,
    );

    if (!selectedStillExists) {
      setSelectedSessionId(todaySessions[0].id);
    }
  }, [selectedSessionId, todaySessions]);

  const showNextSession = () => {
    if (todaySessions.length === 0) return;

    const currentIndex = todaySessions.findIndex(
      (session) => session.id === selectedSessionId,
    );
    const nextIndex = (currentIndex + 1) % todaySessions.length;
    setSelectedSessionId(todaySessions[nextIndex].id);
  };

  if (todaySessions.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <Text style={styles.title}>Zona de Enfoque</Text>
        <FocusEmptyState
          onCreateSession={() => navigation.navigate('NuevaSesion')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Zona de Enfoque</Text>
        <FocusSessionSelector
          sessions={todaySessions}
          selectedSession={selectedSession}
          onNextSession={showNextSession}
        />
      </View>

      <FocusTimerRing timeLeft={timer.timeLeft} progress={timer.progress} />

      <FocusControls
        isActive={timer.isActive}
        onToggle={timer.toggleTimer}
        onReset={timer.resetTimer}
        onStop={timer.stopTimer}
      />

      <PomodoroSummaryCard completedPomodoros={timer.completedPomodoros} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 16,
  },
});
