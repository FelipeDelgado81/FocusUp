import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS } from '../../constants/theme';

interface FocusControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
  onStop: () => void;
}

export default function FocusControls({
  isActive,
  onToggle,
  onReset,
  onStop,
}: FocusControlsProps) {
  return (
    <View style={styles.controls}>
      <TouchableOpacity style={styles.controlBtn} onPress={onReset}>
        <MaterialIcons
          name="replay"
          size={24}
          color={COLORS.onSurfaceVariant}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.playBtn} activeOpacity={0.8} onPress={onToggle}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryContainer]}
          style={styles.playGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialIcons
            name={isActive ? 'pause' : 'play-arrow'}
            size={40}
            color={COLORS.white}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlBtn} onPress={onStop}>
        <MaterialIcons
          name="stop"
          size={24}
          color={COLORS.onSurfaceVariant}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 40,
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBtn: {
    ...SHADOWS.primaryGlow,
  },
  playGradient: {
    width: 76,
    height: 76,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
