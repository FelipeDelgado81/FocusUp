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
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { getTasks, toggleTaskCompleted } from '../storage/asyncStorage';
import TaskItem from '../components/TaskItem';

const CATEGORIES = ['Todas', 'Historia', 'Matemáticas', 'Ciencias', 'Arte'];

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Todas');
  const [showCompleted, setShowCompleted] = useState(false);

  useFocusEffect(
    useCallback(() => {
      (async () => setTasks(await getTasks()))();
    }, []),
  );

  const handleToggle = async (id) => setTasks(await toggleTaskCompleted(id));

  const filtered = tasks.filter((t) => {
    const cat = selectedCat === 'Todas' || t.category === selectedCat;
    return cat && (showCompleted ? t.completed : !t.completed);
  });

  return (
    <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <Text style={s.title}>Mis Tareas Pendientes</Text>
          <Text style={s.sub}>
            Tienes{' '}
            {tasks.filter((t) => !t.completed && t.priority === 'ALTA').length}{' '}
            tareas con alta prioridad.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips}
        >
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[s.chip, selectedCat === c && s.chipOn]}
              onPress={() => setSelectedCat(c)}
            >
              <Text style={[s.chipTxt, selectedCat === c && s.chipTxtOn]}>
                {c}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ gap: 12 }}>
          {filtered.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={handleToggle} />
          ))}
          {filtered.length === 0 && (
            <View style={s.empty}>
              <MaterialIcons
                name="check-circle-outline"
                size={48}
                color={COLORS.outlineVariant}
              />
              <Text style={s.emptyTxt}>
                {showCompleted ? 'No hay completadas' : '¡Todo listo!'}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={s.toggle}
            onPress={() => setShowCompleted(!showCompleted)}
          >
            <MaterialIcons
              name={showCompleted ? 'pending-actions' : 'task-alt'}
              size={18}
              color={COLORS.primary}
            />
            <Text style={s.toggleTxt}>
              {showCompleted ? 'Ver Pendientes' : 'Ver Completadas'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={s.fab} activeOpacity={0.8}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryContainer]}
          style={s.fabG}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons name="add" size={28} color={COLORS.onPrimary} />
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  header: { marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 6,
  },
  sub: { fontSize: 14, color: COLORS.onSurfaceVariant },
  chips: { gap: 8, paddingBottom: 16, marginBottom: 8 },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surfaceContainerHigh,
  },
  chipOn: { backgroundColor: COLORS.primary, ...SHADOWS.md },
  chipTxt: { fontSize: 14, fontWeight: '600', color: COLORS.onSurfaceVariant },
  chipTxtOn: { color: COLORS.onPrimary },
  empty: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  emptyTxt: { fontSize: 15, fontWeight: '500', color: COLORS.onSurfaceVariant },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
  },
  toggleTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  fab: { position: 'absolute', right: 20, bottom: 24, ...SHADOWS.primaryGlow },
  fabG: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
