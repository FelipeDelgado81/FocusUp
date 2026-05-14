import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks, type Task } from '../storage/asyncStorage';

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  refresh: () => Promise<void>;
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (e) {
      console.error('Error loading tasks:', e);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return { tasks, loading, refresh };
}
