import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getSessions, type Session } from '../storage/asyncStorage';

interface UseSessionsReturn {
  sessions: Session[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useSessions(): UseSessionsReturn {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSessions();
      setSessions(data);
    } catch (e) {
      console.error('Error loading sessions:', e);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return { sessions, loading, refresh };
}
