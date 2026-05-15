import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  getTasks,
  addTask,
  updateTask,
  toggleTaskCompleted,
  deleteTask,
  type Task,
} from '../storage/asyncStorage';

type NewTask = Omit<Task, 'id' | 'completed'>;

interface UseTasksReturn {
  tasks: Task[];
  loading: boolean;
  refresh: () => Promise<void>;
  add: (task: NewTask) => Promise<void>;
  update: (id: string, updates: Partial<Omit<Task, 'id'>>) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
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

  const add = useCallback(async (task: NewTask) => {
    const updated = await addTask(task);
    setTasks(updated);
  }, []);

  const update = useCallback(
    async (id: string, updates: Partial<Omit<Task, 'id'>>) => {
      const updated = await updateTask(id, updates);
      setTasks(updated);
    },
    [],
  );

  const toggle = useCallback(async (id: string) => {
    const updated = await toggleTaskCompleted(id);
    setTasks(updated);
  }, []);

  const remove = useCallback(async (id: string) => {
    const updated = await deleteTask(id);
    setTasks(updated);
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  return { tasks, loading, refresh, add, update, toggle, remove };
}
