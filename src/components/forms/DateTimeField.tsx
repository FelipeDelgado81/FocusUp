import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '../../constants/theme';
import { formFieldStyles } from './FormField';

interface DateTimeFieldProps {
  label: string;
  value: string;
  placeholder: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  pickerValue: Date;
  mode: 'date' | 'time';
  visible: boolean;
  minimumDate?: Date;
  onOpen: () => void;
  onClose: () => void;
  onChange: (date: Date) => void;
}

export default function DateTimeField({
  label,
  value,
  placeholder,
  icon,
  pickerValue,
  mode,
  visible,
  minimumDate,
  onOpen,
  onClose,
  onChange,
}: DateTimeFieldProps) {
  return (
    <View>
      <Text style={formFieldStyles.label}>{label}</Text>
      <TouchableOpacity style={styles.dateButton} onPress={onOpen}>
        <MaterialIcons
          name={icon}
          size={18}
          color={value ? COLORS.primary : COLORS.outline}
        />
        <Text style={[styles.dateButtonText, value && styles.filledText]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {visible && (
        <DateTimePicker
          value={pickerValue}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={minimumDate}
          onChange={(_, selectedDate) => {
            if (Platform.OS !== 'ios') onClose();
            if (selectedDate) onChange(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.lg,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateButtonText: {
    fontSize: 15,
    color: COLORS.outline,
    flex: 1,
  },
  filledText: {
    color: COLORS.onSurface,
  },
});
