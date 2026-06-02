import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RADIUS, SHADOWS, type ThemeColors } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

interface FocusEmptyStateProps {
  onCreateSession: () => void;
}

export default function FocusEmptyState({
  onCreateSession,
}: FocusEmptyStateProps) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <MaterialIcons name="timer-off" size={48} color={COLORS.primary} />
      </View>
      <Text style={styles.title}>Sin sesiones para hoy</Text>
      <Text style={styles.subtitle}>
        Crea una sesión de estudio para empezar a enfocarte
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={onCreateSession}
      >
        <MaterialIcons name="add" size={20} color={COLORS.onPrimary} />
        <Text style={styles.buttonText}>Crear sesión de hoy</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (COLORS: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      paddingHorizontal: 32,
    },
    iconWrapper: {
      width: 88,
      height: 88,
      borderRadius: RADIUS.xxl,
      backgroundColor: COLORS.primaryFixed + '30',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: COLORS.onBackground,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: COLORS.onSurfaceVariant,
      textAlign: 'center',
      lineHeight: 20,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      backgroundColor: COLORS.primary,
      paddingHorizontal: 24,
      paddingVertical: 14,
      borderRadius: RADIUS.round,
      marginTop: 8,
      ...SHADOWS.md,
    },
    buttonText: {
      fontSize: 15,
      fontWeight: '700',
      color: COLORS.onPrimary,
    },
  });
