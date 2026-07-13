import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getPomodoroLogs, type PomodoroLog } from '../storage/asyncStorage';

interface UsePomodoroLogsReturn {
  logs: PomodoroLog[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export function usePomodoroLogs(): UsePomodoroLogsReturn {
  const [logs, setLogs] = useState<PomodoroLog[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPomodoroLogs();
      setLogs(data);
    } catch (error) {
      console.error('Error loading pomodoro logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return { logs, loading, refresh };
}
