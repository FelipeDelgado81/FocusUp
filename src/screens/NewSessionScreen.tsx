import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { useSessions } from '../hooks/useSessions';
import type { RootStackNavigationProp, RootStackParamList } from '../navigation/types';
import type { RouteProp } from '@react-navigation/native';

const SUBJECTS: string[] = [
  'Matemáticas Avanzadas',
  'Historia Universal',
  'Biología Molecular',
  'Literatura Contemporánea',
  'Programación',
  'Física',
  'Química',
  'Inglés',
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

type NuevaSesionRouteProp = RouteProp<RootStackParamList, 'NuevaSesion'>;

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

function parseDate(str: string): Date | null {
  const parts = str.split('-');
  if (parts.length !== 3) return null;
  const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  return isNaN(d.getTime()) ? null : d;
}

function parseTime(str: string): Date | null {
  const clean = str.replace(/\s*(AM|PM)/i, '').trim();
  const parts = clean.split(':');
  if (parts.length < 2) return null;
  const d = new Date();
  d.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
  return isNaN(d.getTime()) ? null : d;
}

export default function NewSessionScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<NuevaSesionRouteProp>();
  const { sessions, add, update } = useSessions();
  const editingId = route.params?.sessionId;
  const editingSession = editingId
    ? sessions.find((s) => s.id === editingId)
    : undefined;

  const [subject, setSubject] = useState(editingSession?.subject ?? '');
  const [topic, setTopic] = useState(editingSession?.topic ?? '');
  const [date, setDate] = useState(editingSession?.date ?? '');
  const [startTime, setStartTime] = useState(editingSession?.startTime ?? '');
  const [endTime, setEndTime] = useState(editingSession?.endTime ?? '');
  const [priority, setPriority] = useState(editingSession?.priority ?? 'MEDIA');
  const [location, setLocation] = useState(editingSession?.location ?? '');
  const [notes, setNotes] = useState(editingSession?.notes ?? '');

  const [datePickerDate, setDatePickerDate] = useState<Date>(
    parseDate(editingSession?.date ?? '') ?? new Date(),
  );
  const [startTimeDate, setStartTimeDate] = useState<Date>(
    parseTime(editingSession?.startTime ?? '09:00') ?? new Date(),
  );
  const [endTimeDate, setEndTimeDate] = useState<Date>(
    parseTime(editingSession?.endTime ?? '10:30') ?? new Date(),
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    if (editingSession) {
      setSubject(editingSession.subject);
      setTopic(editingSession.topic);
      setDate(editingSession.date);
      setStartTime(editingSession.startTime);
      setEndTime(editingSession.endTime);
      setPriority(editingSession.priority);
      setLocation(editingSession.location ?? '');
      setNotes(editingSession.notes ?? '');
      if (editingSession.date) {
        const parsed = parseDate(editingSession.date);
        if (parsed) setDatePickerDate(parsed);
      }
      if (editingSession.startTime) {
        const parsed = parseTime(editingSession.startTime);
        if (parsed) setStartTimeDate(parsed);
      }
      if (editingSession.endTime) {
        const parsed = parseTime(editingSession.endTime);
        if (parsed) setEndTimeDate(parsed);
      }
    }
  }, [editingSession]);

  const handleSave = async () => {
    if (!subject || !date || !startTime || !endTime) {
      Alert.alert(
        'Campos requeridos',
        'Por favor completa los campos obligatorios.',
      );
      return;
    }

    const sessionData = {
      subject,
      topic: topic || subject,
      date,
      startTime,
      endTime,
      priority,
      location,
      notes,
    };

    if (editingId && editingSession) {
      await update(editingId, sessionData);
    } else {
      await add(sessionData);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={s.container} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={s.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <Text style={s.title}>
            {editingSession ? 'Editar Sesión' : 'Nueva Sesión de Estudio'}
          </Text>
          <Text style={s.sub}>
            {editingSession
              ? 'Modifica los detalles de tu sesión.'
              : 'Organiza tu tiempo para alcanzar el máximo rendimiento.'}
          </Text>
        </View>

        <View style={s.form}>
          <View style={s.notice}>
            <MaterialIcons name="info" size={14} color={COLORS.error} />
            <Text style={s.noticeTxt}>
              Todos los campos con * son obligatorios
            </Text>
          </View>

          <Text style={s.label}>Asignatura *</Text>
          <View style={s.pickerWrap}>
            {SUBJECTS.map((sub) => (
              <TouchableOpacity
                key={sub}
                style={[s.pickerItem, subject === sub && s.pickerItemOn]}
                onPress={() => setSubject(sub)}
              >
                <Text style={[s.pickerTxt, subject === sub && s.pickerTxtOn]}>
                  {sub}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={s.label}>Tema</Text>
          <TextInput
            style={s.input}
            placeholder="Ej: Cálculo Integral"
            placeholderTextColor={COLORS.outline}
            value={topic}
            onChangeText={setTopic}
          />

          <Text style={s.label}>Fecha *</Text>
          <TouchableOpacity
            style={s.dateBtn}
            onPress={() => setShowDatePicker(true)}
          >
            <MaterialIcons
              name="calendar-today"
              size={18}
              color={date ? COLORS.primary : COLORS.outline}
            />
            <Text style={[s.dateBtnText, date && s.dateBtnTextFilled]}>
              {date || 'Seleccionar fecha'}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={datePickerDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(_, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDatePickerDate(selectedDate);
                  setDate(formatDate(selectedDate));
                }
              }}
            />
          )}

          <View style={s.timeRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.label}>Inicio *</Text>
              <TouchableOpacity
                style={s.dateBtn}
                onPress={() => setShowStartTimePicker(true)}
              >
                <MaterialIcons
                  name="access-time"
                  size={18}
                  color={startTime ? COLORS.primary : COLORS.outline}
                />
                <Text style={[s.dateBtnText, startTime && s.dateBtnTextFilled]}>
                  {startTime || 'Hora'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={s.label}>Fin *</Text>
              <TouchableOpacity
                style={s.dateBtn}
                onPress={() => setShowEndTimePicker(true)}
              >
                <MaterialIcons
                  name="access-time"
                  size={18}
                  color={endTime ? COLORS.primary : COLORS.outline}
                />
                <Text style={[s.dateBtnText, endTime && s.dateBtnTextFilled]}>
                  {endTime || 'Hora'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {showStartTimePicker && (
            <DateTimePicker
              value={startTimeDate}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selectedDate) => {
                setShowStartTimePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setStartTimeDate(selectedDate);
                  setStartTime(formatTime(selectedDate));
                }
              }}
            />
          )}

          {showEndTimePicker && (
            <DateTimePicker
              value={endTimeDate}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(_, selectedDate) => {
                setShowEndTimePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setEndTimeDate(selectedDate);
                  setEndTime(formatTime(selectedDate));
                }
              }}
            />
          )}

          <Text style={s.label}>Ubicación</Text>
          <TextInput
            style={s.input}
            placeholder="Ej: Aula 402, Biblioteca..."
            placeholderTextColor={COLORS.outline}
            value={location}
            onChangeText={setLocation}
          />

          <Text style={s.label}>Prioridad *</Text>
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

          <Text style={s.label}>Notas adicionales</Text>
          <TextInput
            style={[s.input, { height: 100, textAlignVertical: 'top' }]}
            placeholder="¿Qué temas específicos repasarás?"
            placeholderTextColor={COLORS.outline}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

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
              <Text style={s.saveTxt}>
                {editingSession ? 'Actualizar Sesión' : 'Guardar Sesión'}
              </Text>
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
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.errorContainer + '30',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.error + '20',
    marginBottom: 20,
  },
  noticeTxt: { fontSize: 12, fontWeight: '600', color: COLORS.error },
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
  dateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateBtnText: {
    fontSize: 15,
    color: COLORS.outline,
    flex: 1,
  },
  dateBtnTextFilled: {
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
  timeRow: { flexDirection: 'row' },
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
