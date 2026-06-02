import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RADIUS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';
import { useFormFieldStyles } from './FormField';

interface OptionChipsProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function OptionChips({
  label,
  options,
  selectedValue,
  onSelect,
}: OptionChipsProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  const fieldStyles = useFormFieldStyles();
  return (
    <View>
      <Text style={fieldStyles.label}>{label}</Text>
      <View style={styles.pickerWrap}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.pickerItem,
              selectedValue === option && styles.pickerItemOn,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text
              style={[
                styles.pickerText,
                selectedValue === option && styles.pickerTextOn,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    pickerWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
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
    pickerText: {
      fontSize: 13,
      fontWeight: '500',
      color: COLORS.onSurfaceVariant,
    },
    pickerTextOn: {
      color: COLORS.primary,
      fontWeight: '700',
    },
  });
