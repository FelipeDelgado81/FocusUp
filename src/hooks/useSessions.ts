import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  getSessions,
  addSession,
  updateSession,
  deleteSession,
  type Session,
} from '../storage/asyncStorage';

export type { Session } from '../storage/asyncStorage';

type NewSession = Omit<Session, 'id' | 'status' | 'completedAt'>;

interface UseSessionsReturn {
  sessions: Session[];
  loading: boolean;
  refresh: () => Promise<void>;
  add: (session: NewSession) => Promise<void>;
  update: (id: string, updates: Partial<Omit<Session, 'id'>>) => Promise<void>;
  remove: (id: string) => Promise<void>;
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

  const add = useCallback(async (session: NewSession) => {
    const updated = await addSession(session);
    setSessions(updated);
  }, []);

  const update = useCallback(
    async (id: string, updates: Partial<Omit<Session, 'id'>>) => {
      const updated = await updateSession(id, updates);
      setSessions(updated);
    },
    [],
  );

  const remove = useCallback(async (id: string) => {
    const updated = await deleteSession(id);
    setSessions(updated);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return { sessions, loading, refresh, add, update, remove };
}
