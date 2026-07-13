import React, { useMemo } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DashboardEmptyState from '../components/dashboard/DashboardEmptyState';
import DashboardGreeting from '../components/dashboard/DashboardGreeting';
import DashboardSessionList from '../components/dashboard/DashboardSessionList';
import DashboardStatsRow from '../components/dashboard/DashboardStatsRow';
import DailyProgressCard from '../components/dashboard/DailyProgressCard';
import FloatingAddButton from '../components/FloatingAddButton';
import { COLORS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp } from '../navigation/types';
import { getTodayDateKey } from '../utils/date';
import { getDailyProgress, getGreetingMessage } from '../utils/dashboard';
import { useAuth } from '../providers/AuthProvider';

export default function DashboardScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { sessions, loading } = useSessions();
  const { signOut } = useAuth();
  const today = getTodayDateKey();

  const todayCount = useMemo(
    () => sessions.filter((session) => session.date === today).length,
    [sessions, today],
  );
  const totalCount = sessions.length;
  const progress = useMemo(() => getDailyProgress(todayCount), [todayCount]);
  const greeting = getGreetingMessage();

  const handleSignOut = () => {
    Alert.alert(
      'Cerrar sesión',
      'Tendrás que ingresar nuevamente para ver tus datos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greetingRow}>
          <DashboardGreeting
            title={greeting.title}
            subtitle={greeting.subtitle}
          />
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
            accessibilityLabel="Cerrar sesión"
          >
            <MaterialIcons name="logout" size={22} color={COLORS.primary} />
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
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  signOutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.surfaceContainerLow,
  },
});
