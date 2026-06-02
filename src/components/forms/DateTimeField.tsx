import React, { useMemo } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from '@expo/vector-icons';
import { RADIUS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useFormFieldStyles } from './FormField';

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
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  const fieldStyles = useFormFieldStyles();
  return (
    <View>
      <Text style={fieldStyles.label}>{label}</Text>
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
        <View style={styles.pickerContainer}>
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

          {Platform.OS === 'ios' && (
            <View style={styles.iosActions}>
              <TouchableOpacity onPress={onClose} style={styles.doneButton}>
                <Text style={styles.doneText}>Listo</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
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
    pickerContainer: {
      marginTop: 8,
    },
    iosActions: {
      alignItems: 'flex-end',
      paddingTop: 8,
    },
    doneButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: RADIUS.md,
      backgroundColor: COLORS.primary,
    },
    doneText: {
      color: COLORS.onPrimary,
      fontSize: 14,
      fontWeight: '700',
    },
  });
