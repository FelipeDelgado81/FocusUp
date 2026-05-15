import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgGradient,
  Stop,
} from 'react-native-svg';
import { COLORS } from '../../constants/theme';

const CIRCLE_RADIUS = 120;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

interface FocusTimerRingProps {
  timeLeft: number;
  progress: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function FocusTimerRing({
  timeLeft,
  progress,
}: FocusTimerRingProps) {
  const strokeDashoffset = CIRCUMFERENCE - CIRCUMFERENCE * progress;

  return (
    <View style={styles.timerContainer}>
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
  );
}

const styles = StyleSheet.create({
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
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginTop: 2,
  },
});
