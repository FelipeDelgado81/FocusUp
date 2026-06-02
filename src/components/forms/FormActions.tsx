import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RADIUS, SHADOWS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface FormActionsProps {
  saveLabel: string;
  onSave: () => void;
  onCancel: () => void;
}

export default function FormActions({
  saveLabel,
  onSave,
  onCancel,
}: FormActionsProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={onSave}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryContainer]}
          style={styles.saveButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <MaterialIcons
            name="check-circle"
            size={20}
            color={COLORS.onPrimary}
          />
          <Text style={styles.saveText}>{saveLabel}</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 16,
      borderRadius: RADIUS.lg,
      marginTop: 24,
      ...SHADOWS.primaryGlow,
    },
    saveText: {
      fontSize: 15,
      fontWeight: '700',
      color: COLORS.onPrimary,
    },
    cancelButton: {
      alignItems: 'center',
      paddingVertical: 16,
      borderRadius: RADIUS.lg,
      backgroundColor: COLORS.surfaceContainerHigh,
      marginTop: 12,
    },
    cancelText: {
      fontSize: 15,
      fontWeight: '700',
      color: COLORS.onSurfaceVariant,
    },
  });
