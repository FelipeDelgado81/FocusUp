import React, { useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import { RADIUS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface FormFieldProps extends TextInputProps {
  label: string;
  inputStyle?: StyleProp<TextStyle>;
}

export default function FormField({
  label,
  inputStyle,
  ...inputProps
}: FormFieldProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={COLORS.outline}
        {...inputProps}
      />
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
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
  });

export function useFormFieldStyles() {
  const { colors: COLORS } = useTheme();
  return useMemo(() => createStyles(COLORS), [COLORS]);
}
