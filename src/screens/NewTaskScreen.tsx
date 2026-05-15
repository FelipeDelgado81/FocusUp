import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { useTasks } from '../hooks/useTasks';
import type { RootStackNavigationProp } from '../navigation/types';

const CATEGORIES: string[] = [
  'Historia',
  'Matemáticas',
  'Ciencias',
  'Arte',
  'Programación',
  'Idiomas',
];

interface PriorityOption {
  label: string;
  value: string;
  dot: string;
  activeBg: string;
  border: string;
}

const PRIORITIES: PriorityOption[] = [
  {
    label: 'Alta',
    value: 'ALTA',
    dot: COLORS.error,
    activeBg: COLORS.errorContainer + '50',
    border: COLORS.error,
  },
  {
    label: 'Media',
    value: 'MEDIA',
    dot: COLORS.tertiary,
    activeBg: COLORS.tertiaryFixed,
    border: COLORS.tertiary,
  },
  {
    label: 'Baja',
    value: 'BAJA',
    dot: COLORS.secondary,
    activeBg: COLORS.secondaryContainer + '50',
    border: COLORS.secondary,
  },
];

export default function NewTaskScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { add } = useTasks();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('MEDIA');
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Campo requerido', 'El título de la tarea es obligatorio.');
      return;
    }

    await add({
      title: title.trim(),
      dueDate: dueDate || 'Sin fecha',
      priority,
      category,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={s.container} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <Text style={s.title}>Nueva Tarea</Text>
          <Text style={s.sub}>Agrega una tarea a tu lista pendiente.</Text>
        </View>

        <View style={s.form}>
          <Text style={s.label}>Título *</Text>
          <TextInput
            style={s.input}
            placeholder="Ej: Resolver ejercicios de cálculo"
            placeholderTextColor={COLORS.outline}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={s.label}>Fecha límite</Text>
          <TextInput
            style={s.input}
            placeholder="YYYY-MM-DD o 'Sin fecha'"
            placeholderTextColor={COLORS.outline}
            value={dueDate}
            onChangeText={setDueDate}
          />

          <Text style={s.label}>Categoría</Text>
          <View style={s.pickerWrap}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[s.pickerItem, category === cat && s.pickerItemOn]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[s.pickerTxt, category === cat && s.pickerTxtOn]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.label}>Prioridad</Text>
          <View style={s.prioRow}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p.value}
                style={[
                  s.prioBtn,
                  priority === p.value && {
                    backgroundColor: p.activeBg,
                    borderColor: p.border,
                    borderWidth: 2,
                  },
                ]}
                onPress={() => setPriority(p.value)}
              >
                <View style={[s.prioDot, { backgroundColor: p.dot }]} />
                <Text
                  style={[
                    s.prioTxt,
                    priority === p.value && { color: p.border },
                  ]}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity activeOpacity={0.8} onPress={handleSave}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryContainer]}
              style={s.saveBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialIcons
                name="check-circle"
                size={20}
                color={COLORS.onPrimary}
              />
              <Text style={s.saveTxt}>Guardar Tarea</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={s.cancelTxt}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
  header: { marginBottom: 24 },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.onBackground,
    letterSpacing: -0.5,
  },
  sub: { fontSize: 14, color: COLORS.onSurfaceVariant, marginTop: 6 },
  form: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xxl,
    padding: 24,
    ...SHADOWS.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.onSurface,
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 4,
  },
  input: {
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: COLORS.onSurface,
  },
  pickerWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pickerItem: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  pickerItemOn: {
    backgroundColor: COLORS.primaryFixed,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  pickerTxt: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  pickerTxtOn: { color: COLORS.primary, fontWeight: '700' },
  prioRow: { flexDirection: 'row', gap: 10 },
  prioBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceContainer,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  prioDot: { width: 8, height: 8, borderRadius: 4 },
  prioTxt: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    marginTop: 24,
    ...SHADOWS.primaryGlow,
  },
  saveTxt: { fontSize: 15, fontWeight: '700', color: COLORS.onPrimary },
  cancelBtn: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceContainerHigh,
    marginTop: 12,
  },
  cancelTxt: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
  },
});
