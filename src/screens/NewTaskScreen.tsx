import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimeField from '../components/forms/DateTimeField';
import FormActions from '../components/forms/FormActions';
import FormField from '../components/forms/FormField';
import FormScaffold from '../components/forms/FormScaffold';
import OptionChips from '../components/forms/OptionChips';
import PrioritySelector from '../components/forms/PrioritySelector';
import { TASK_CATEGORIES } from '../constants/formOptions';
import { useTasks } from '../hooks/useTasks';
import type { RootStackNavigationProp } from '../navigation/types';
import { formatDate } from '../utils/dateTime';

export default function NewTaskScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { add } = useTasks();

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('MEDIA');
  const [category, setCategory] = useState(TASK_CATEGORIES[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(new Date());

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
    <FormScaffold
      title="Nueva Tarea"
      subtitle="Agrega una tarea a tu lista pendiente."
    >
      <FormField
        label="Título *"
        placeholder="Ej: Resolver ejercicios de cálculo"
        value={title}
        onChangeText={setTitle}
      />

      <DateTimeField
        label="Fecha límite"
        value={dueDate}
        placeholder="Seleccionar fecha"
        icon="calendar-today"
        mode="date"
        pickerValue={pickerDate}
        visible={showDatePicker}
        minimumDate={new Date()}
        onOpen={() => setShowDatePicker(true)}
        onClose={() => setShowDatePicker(false)}
        onChange={(selectedDate) => {
          setPickerDate(selectedDate);
          setDueDate(formatDate(selectedDate));
        }}
      />

      <OptionChips
        label="Categoría"
        options={TASK_CATEGORIES}
        selectedValue={category}
        onSelect={setCategory}
      />

      <PrioritySelector
        label="Prioridad"
        value={priority}
        onChange={setPriority}
      />

      <FormActions
        saveLabel="Guardar Tarea"
        onSave={handleSave}
        onCancel={() => navigation.goBack()}
      />
    </FormScaffold>
  );
}
