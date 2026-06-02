import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RADIUS, SHADOWS } from '../constants/theme';
import { useTheme } from '../context/ThemeContext';

interface FloatingAddButtonProps {
  onPress: () => void;
}

const FAB_BOTTOM = Platform.OS === 'ios' ? 100 : 86;

export default function FloatingAddButton({ onPress }: FloatingAddButtonProps) {
  const { colors: COLORS } = useTheme();
  return (
    <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={onPress}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryContainer]}
        style={styles.fabGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <MaterialIcons name="add" size={28} color={COLORS.onPrimary} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 20,
    bottom: FAB_BOTTOM,
    ...SHADOWS.primaryGlow,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
