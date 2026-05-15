import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import DateTimeField from '../components/forms/DateTimeField';
import FormActions from '../components/forms/FormActions';
import FormField from '../components/forms/FormField';
import FormScaffold from '../components/forms/FormScaffold';
import OptionChips from '../components/forms/OptionChips';
import PrioritySelector from '../components/forms/PrioritySelector';
import { SUBJECTS } from '../constants/formOptions';
import { COLORS, RADIUS } from '../constants/theme';
import { useSessions, type Session } from '../hooks/useSessions';
import type {
  RootStackNavigationProp,
  RootStackParamList,
} from '../navigation/types';
import { formatDate, formatTime, parseDate, parseTime } from '../utils/dateTime';

type NuevaSesionRouteProp = RouteProp<RootStackParamList, 'NuevaSesion'>;

function getInitialDate(value?: string): Date {
  return parseDate(value ?? '') ?? new Date();
}

function getInitialTime(value: string | undefined, fallback: string): Date {
  return parseTime(value ?? fallback) ?? new Date();
}

export default function NewSessionScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const route = useRoute<NuevaSesionRouteProp>();
  const { sessions, add, update } = useSessions();

  const editingId = route.params?.sessionId;
  const editingSession = editingId
    ? sessions.find((session) => session.id === editingId)
    : undefined;

  const [subject, setSubject] = useState(editingSession?.subject ?? '');
  const [topic, setTopic] = useState(editingSession?.topic ?? '');
  const [date, setDate] = useState(editingSession?.date ?? '');
  const [startTime, setStartTime] = useState(editingSession?.startTime ?? '');
  const [endTime, setEndTime] = useState(editingSession?.endTime ?? '');
  const [priority, setPriority] = useState(editingSession?.priority ?? 'MEDIA');
  const [location, setLocation] = useState(editingSession?.location ?? '');
  const [notes, setNotes] = useState(editingSession?.notes ?? '');

  const [datePickerDate, setDatePickerDate] = useState(
    getInitialDate(editingSession?.date),
  );
  const [startTimeDate, setStartTimeDate] = useState(
    getInitialTime(editingSession?.startTime, '09:00'),
  );
  const [endTimeDate, setEndTimeDate] = useState(
    getInitialTime(editingSession?.endTime, '10:30'),
  );

  const [visiblePicker, setVisiblePicker] = useState<
    'date' | 'startTime' | 'endTime' | null
  >(null);

  useEffect(() => {
    if (!editingSession) return;

    setSubject(editingSession.subject);
    setTopic(editingSession.topic);
    setDate(editingSession.date);
    setStartTime(editingSession.startTime);
    setEndTime(editingSession.endTime);
    setPriority(editingSession.priority);
    setLocation(editingSession.location ?? '');
    setNotes(editingSession.notes ?? '');
    setDatePickerDate(getInitialDate(editingSession.date));
    setStartTimeDate(getInitialTime(editingSession.startTime, '09:00'));
    setEndTimeDate(getInitialTime(editingSession.endTime, '10:30'));
  }, [editingSession]);

  const handleSave = async () => {
    if (!subject || !date || !startTime || !endTime) {
      Alert.alert(
        'Campos requeridos',
        'Por favor completa los campos obligatorios.',
      );
      return;
    }

    const sessionData: Omit<Session, 'id'> = {
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

  const title = editingSession ? 'Editar Sesión' : 'Nueva Sesión de Estudio';
  const subtitle = editingSession
    ? 'Modifica los detalles de tu sesión.'
    : 'Organiza tu tiempo para alcanzar el máximo rendimiento.';

  return (
    <FormScaffold title={title} subtitle={subtitle}>
      <View style={styles.notice}>
        <MaterialIcons name="info" size={14} color={COLORS.error} />
        <Text style={styles.noticeText}>
          Todos los campos con * son obligatorios
        </Text>
      </View>

      <OptionChips
        label="Asignatura *"
        options={SUBJECTS}
        selectedValue={subject}
        onSelect={setSubject}
      />

      <FormField
        label="Tema"
        placeholder="Ej: Cálculo Integral"
        value={topic}
        onChangeText={setTopic}
      />

      <DateTimeField
        label="Fecha *"
        value={date}
        placeholder="Seleccionar fecha"
        icon="calendar-today"
        mode="date"
        pickerValue={datePickerDate}
        visible={visiblePicker === 'date'}
        minimumDate={new Date()}
        onOpen={() => setVisiblePicker('date')}
        onClose={() => setVisiblePicker(null)}
        onChange={(selectedDate) => {
          setDatePickerDate(selectedDate);
          setDate(formatDate(selectedDate));
        }}
      />

      <View style={styles.timeRow}>
        <View style={styles.timeField}>
          <DateTimeField
            label="Inicio *"
            value={startTime}
            placeholder="Hora"
            icon="access-time"
            mode="time"
            pickerValue={startTimeDate}
            visible={visiblePicker === 'startTime'}
            onOpen={() => setVisiblePicker('startTime')}
            onClose={() => setVisiblePicker(null)}
            onChange={(selectedDate) => {
              setStartTimeDate(selectedDate);
              setStartTime(formatTime(selectedDate));
            }}
          />
        </View>
        <View style={styles.timeGap} />
        <View style={styles.timeField}>
          <DateTimeField
            label="Fin *"
            value={endTime}
            placeholder="Hora"
            icon="access-time"
            mode="time"
            pickerValue={endTimeDate}
            visible={visiblePicker === 'endTime'}
            onOpen={() => setVisiblePicker('endTime')}
            onClose={() => setVisiblePicker(null)}
            onChange={(selectedDate) => {
              setEndTimeDate(selectedDate);
              setEndTime(formatTime(selectedDate));
            }}
          />
        </View>
      </View>

      <FormField
        label="Ubicación"
        placeholder="Ej: Aula 402, Biblioteca..."
        value={location}
        onChangeText={setLocation}
      />

      <PrioritySelector
        label="Prioridad *"
        value={priority}
        onChange={setPriority}
      />

      <FormField
        label="Notas adicionales"
        placeholder="¿Qué temas específicos repasarás?"
        multiline
        value={notes}
        onChangeText={setNotes}
        inputStyle={styles.notesInput}
      />

      <FormActions
        saveLabel={editingSession ? 'Actualizar Sesión' : 'Guardar Sesión'}
        onSave={handleSave}
        onCancel={() => navigation.goBack()}
      />
    </FormScaffold>
  );
}

const styles = StyleSheet.create({
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
  noticeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.error,
  },
  timeRow: {
    flexDirection: 'row',
  },
  timeField: {
    flex: 1,
  },
  timeGap: {
    width: 12,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
