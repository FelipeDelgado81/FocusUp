import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSIONS_KEY = '@focusup_sessions';
const TASKS_KEY = '@focusup_tasks';

export interface Session {
  id: string;
  subject: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  category: string;
}

type NewSession = Omit<Session, 'id'>;
type NewTask = Omit<Task, 'id' | 'completed'>;

// --- Sessions ---

export const getSessions = async (): Promise<Session[]> => {
  try {
    const json = await AsyncStorage.getItem(SESSIONS_KEY);
    if (json !== null) {
      return JSON.parse(json) as Session[];
    }
    return [];
  } catch (e) {
    console.error('Error reading sessions:', e);
    return [];
  }
};

export const saveSessions = async (sessions: Session[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Error saving sessions:', e);
  }
};

export const addSession = async (session: NewSession): Promise<Session[]> => {
  const sessions = await getSessions();
  const newSession: Session = {
    ...session,
    id: Date.now().toString(),
  };
  const updated = [...sessions, newSession];
  await saveSessions(updated);
  return updated;
};

export const deleteSession = async (sessionId: string): Promise<Session[]> => {
  const sessions = await getSessions();
  const updated = sessions.filter((s) => s.id !== sessionId);
  await saveSessions(updated);
  return updated;
};

// --- Tasks ---

export const getTasks = async (): Promise<Task[]> => {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    if (json !== null) {
      return JSON.parse(json) as Task[];
    }
    return [];
  } catch (e) {
    console.error('Error reading tasks:', e);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
};

export const toggleTaskCompleted = async (taskId: string): Promise<Task[]> => {
  const tasks = await getTasks();
  const updated = tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t,
  );
  await saveTasks(updated);
  return updated;
};

export const addTask = async (task: NewTask): Promise<Task[]> => {
  const tasks = await getTasks();
  const newTask: Task = {
    ...task,
    id: Date.now().toString(),
    completed: false,
  };
  const updated = [...tasks, newTask];
  await saveTasks(updated);
  return updated;
};
