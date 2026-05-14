import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSIONS_KEY = '@focusup_sessions';
const TASKS_KEY = '@focusup_tasks';

// --- Default Mock Data ---

const DEFAULT_SESSIONS = [
  {
    id: '1',
    subject: 'Matemáticas',
    topic: 'Cálculo Integral',
    date: '2023-10-17',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    priority: 'ALTA',
  },
  {
    id: '2',
    subject: 'Historia',
    topic: 'Revolución Industrial',
    date: '2023-10-17',
    startTime: '12:45 PM',
    endTime: '02:00 PM',
    priority: 'MEDIA',
  },
  {
    id: '3',
    subject: 'Programación',
    topic: 'Algoritmos con Go',
    date: '2023-10-17',
    startTime: '04:30 PM',
    endTime: '06:00 PM',
    priority: 'BAJA',
  },
];

const DEFAULT_TASKS = [
  {
    id: '1',
    title: 'Terminar el ensayo de Historia',
    dueDate: 'Mañana',
    priority: 'ALTA',
    completed: false,
    category: 'Historia',
  },
  {
    id: '2',
    title: 'Repasar ejercicios de cálculo',
    dueDate: 'Hoy, 18:00',
    priority: 'ALTA',
    completed: false,
    category: 'Matemáticas',
  },
  {
    id: '3',
    title: 'Leer capítulo 4 de Biología',
    dueDate: '15 de Oct',
    priority: 'MEDIA',
    completed: false,
    category: 'Ciencias',
  },
];

// --- Sessions ---

export const getSessions = async () => {
  try {
    const json = await AsyncStorage.getItem(SESSIONS_KEY);
    if (json !== null) {
      return JSON.parse(json);
    }
    // First run — seed with mock data
    await saveSessions(DEFAULT_SESSIONS);
    return DEFAULT_SESSIONS;
  } catch (e) {
    console.error('Error reading sessions:', e);
    return DEFAULT_SESSIONS;
  }
};

export const saveSessions = async (sessions) => {
  try {
    await AsyncStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch (e) {
    console.error('Error saving sessions:', e);
  }
};

export const addSession = async (session) => {
  const sessions = await getSessions();
  const newSession = {
    ...session,
    id: Date.now().toString(),
  };
  const updated = [...sessions, newSession];
  await saveSessions(updated);
  return updated;
};

export const deleteSession = async (sessionId) => {
  const sessions = await getSessions();
  const updated = sessions.filter((s) => s.id !== sessionId);
  await saveSessions(updated);
  return updated;
};

// --- Tasks ---

export const getTasks = async () => {
  try {
    const json = await AsyncStorage.getItem(TASKS_KEY);
    if (json !== null) {
      return JSON.parse(json);
    }
    // First run — seed with mock data
    await saveTasks(DEFAULT_TASKS);
    return DEFAULT_TASKS;
  } catch (e) {
    console.error('Error reading tasks:', e);
    return DEFAULT_TASKS;
  }
};

export const saveTasks = async (tasks) => {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Error saving tasks:', e);
  }
};

export const toggleTaskCompleted = async (taskId) => {
  const tasks = await getTasks();
  const updated = tasks.map((t) =>
    t.id === taskId ? { ...t, completed: !t.completed } : t,
  );
  await saveTasks(updated);
  return updated;
};

export const addTask = async (task) => {
  const tasks = await getTasks();
  const newTask = {
    ...task,
    id: Date.now().toString(),
    completed: false,
  };
  const updated = [...tasks, newTask];
  await saveTasks(updated);
  return updated;
};
