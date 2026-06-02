import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardEmptyState from '../components/dashboard/DashboardEmptyState';
import DashboardGreeting from '../components/dashboard/DashboardGreeting';
import DashboardSessionList from '../components/dashboard/DashboardSessionList';
import DashboardStatsRow from '../components/dashboard/DashboardStatsRow';
import DailyProgressCard from '../components/dashboard/DailyProgressCard';
import FloatingAddButton from '../components/FloatingAddButton';
import { RADIUS, type ThemeColors } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp } from '../navigation/types';
import { getTodayDateKey } from '../utils/date';
import { getDailyProgress, getGreetingMessage } from '../utils/dashboard';

export default function DashboardScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { colors: COLORS, isDark, toggleTheme } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
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
        <View style={styles.headerRow}>
          <View style={styles.greetingFill}>
            <DashboardGreeting
              title={greeting.title}
              subtitle={greeting.subtitle}
            />
          </View>
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={toggleTheme}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={
              isDark ? 'Activar modo claro' : 'Activar modo oscuro'
            }
          >
            <MaterialIcons
              name={isDark ? 'light-mode' : 'dark-mode'}
              size={22}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>

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
            actionLabel="Crear mi primera sesión"
            onAction={() => navigation.navigate('NuevaSesion')}
          />
        )}
      </ScrollView>

      <FloatingAddButton onPress={() => navigation.navigate('NuevaSesion')} />
    </SafeAreaView>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.background,
    },
    scroll: {
      paddingHorizontal: 20,
      paddingTop: 8,
      paddingBottom: 100,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    greetingFill: {
      flex: 1,
    },
    themeToggle: {
      width: 44,
      height: 44,
      borderRadius: RADIUS.round,
      backgroundColor: COLORS.surfaceContainerHigh,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
  });
