import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';

const TOTAL_SECONDS = 25 * 60;
const CIRCLE_RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function FocusZoneScreen() {
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(TOTAL_SECONDS);
  };

  const progress = timeLeft / TOTAL_SECONDS;
  const strokeDashoffset = CIRCUMFERENCE - CIRCUMFERENCE * progress;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Zona de Enfoque</Text>
        <View style={styles.studyingBadge}>
          <Animated.View
            style={[
              styles.pulseDot,
              { transform: [{ scale: isActive ? pulseAnim : 1 }] },
            ]}
          />
          <Text style={styles.studyingText}>
            Estudiando: Diseño de Interfaces
          </Text>
        </View>
      </View>

      {/* Timer Ring */}
      <View style={styles.timerContainer}>
        {/* Glow */}
        <View style={styles.timerGlow} />
        <Svg
          width={CIRCLE_RADIUS * 2 + 24}
          height={CIRCLE_RADIUS * 2 + 24}
          style={styles.timerSvg}
        >
          <Defs>
            <SvgGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#004ac6" />
              <Stop offset="100%" stopColor="#2563eb" />
            </SvgGradient>
          </Defs>
          <Circle
            cx={CIRCLE_RADIUS + 12}
            cy={CIRCLE_RADIUS + 12}
            r={CIRCLE_RADIUS}
            stroke={COLORS.surfaceContainerHigh}
            strokeWidth={8}
            fill="transparent"
          />
          <Circle
            cx={CIRCLE_RADIUS + 12}
            cy={CIRCLE_RADIUS + 12}
            r={CIRCLE_RADIUS}
            stroke="url(#timerGrad)"
            strokeWidth={10}
            fill="transparent"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${CIRCLE_RADIUS + 12},${CIRCLE_RADIUS + 12}`}
          />
        </Svg>
        <View style={styles.timerCenter}>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          <Text style={styles.timerLabel}>Minutos</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlBtn} onPress={resetTimer}>
          <MaterialIcons name="replay" size={24} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playBtn}
          activeOpacity={0.8}
          onPress={() => setIsActive(!isActive)}
        >
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

        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setIsActive(false)}
        >
          <MaterialIcons name="stop" size={24} color={COLORS.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      {/* Break Info */}
      <View style={styles.breakCard}>
        <View style={styles.breakLeft}>
          <View style={styles.breakIcon}>
            <MaterialIcons name="coffee" size={24} color={COLORS.onSecondaryContainer} />
          </View>
          <View>
            <Text style={styles.breakLabel}>Siguiente descanso</Text>
            <Text style={styles.breakValue}>5 minutos</Text>
          </View>
        </View>
        <View style={styles.breakCounter}>
          <Text style={styles.breakCounterText}>1/4</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.onBackground,
    marginBottom: 10,
  },
  studyingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  studyingText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
  },
  // Timer
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  timerGlow: {
    position: 'absolute',
    width: CIRCLE_RADIUS * 2 + 40,
    height: CIRCLE_RADIUS * 2 + 40,
    borderRadius: CIRCLE_RADIUS + 20,
    backgroundColor: COLORS.primary + '10',
  },
  timerSvg: {
    transform: [{ rotate: '0deg' }],
  },
  timerCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 56,
    fontWeight: '800',
    color: COLORS.onBackground,
    letterSpacing: -2,
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 2,
  },
  // Controls
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
  // Break
  breakCard: {
    width: '100%',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.xxl,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  breakIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.secondaryContainer + '50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  breakValue: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.onBackground,
    marginTop: 2,
  },
  breakCounter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breakCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
});
