import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

const SECONDS_PER_MINUTE = 60;

interface UsePomodoroTimerOptions {
  focusMinutes: number;
}

interface UsePomodoroTimerReturn {
  timeLeft: number;
  totalSeconds: number;
  isActive: boolean;
  completedPomodoros: number;
  progress: number;
  toggleTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
}

export function usePomodoroTimer({
  focusMinutes,
}: UsePomodoroTimerOptions): UsePomodoroTimerReturn {
  const totalSeconds = useMemo(
    () => focusMinutes * SECONDS_PER_MINUTE,
    [focusMinutes],
  );
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  useEffect(() => {
    setTimeLeft(totalSeconds);
    setIsActive(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (!isActive) return undefined;

    if (timeLeft === 0) {
      setIsActive(false);
      setCompletedPomodoros((value) => value + 1);
      Alert.alert(
        '¡Sesión completada!',
        `Has terminado un pomodoro de ${focusMinutes} minutos.`,
      );
      return undefined;
    }

    const interval = setInterval(() => {
      setTimeLeft((seconds) => Math.max(seconds - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [focusMinutes, isActive, timeLeft]);

  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 1;

  return {
    timeLeft,
    totalSeconds,
    isActive,
    completedPomodoros,
    progress,
    toggleTimer: () => setIsActive((value) => !value),
    resetTimer: () => {
      setIsActive(false);
      setTimeLeft(totalSeconds);
    },
    stopTimer: () => {
      setIsActive(false);
      setTimeLeft(totalSeconds);
    },
  };
}
