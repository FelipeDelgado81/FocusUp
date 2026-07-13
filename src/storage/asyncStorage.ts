import { supabase } from '../lib/supabase';

export interface Session {
  id: string;
  subject: string;
  topic: string;
  date: string;
  startTime: string;
  endTime: string;
  priority: string;
  location?: string;
  notes?: string;
  status: 'scheduled' | 'completed';
  completedAt?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  category: string;
}

export interface PomodoroLog {
  id: string;
  sessionId?: string;
  subject?: string;
  durationMinutes: number;
  completedAt: string;
}

type NewSession = Omit<Session, 'id' | 'status' | 'completedAt'>;
type NewTask = Omit<Task, 'id' | 'completed'>;

interface SessionRow {
  id: string;
  subject: string;
  topic: string;
  scheduled_date: string;
  start_time: string;
  end_time: string;
  priority: string;
  location: string | null;
  notes: string | null;
  status: 'scheduled' | 'completed';
  completed_at: string | null;
}

interface TaskRow {
  id: string;
  title: string;
  due_date: string | null;
  priority: string;
  completed: boolean;
  category: string;
}

interface PomodoroLogRow {
  id: string;
  study_session_id: string | null;
  duration_minutes: number;
  completed_at: string;
  study_sessions?: { subject: string }[] | null;
}

const toSession = (row: SessionRow): Session => ({
  id: row.id,
  subject: row.subject,
  topic: row.topic,
  date: row.scheduled_date,
  startTime: row.start_time.slice(0, 5),
  endTime: row.end_time.slice(0, 5),
  priority: row.priority,
  location: row.location ?? undefined,
  notes: row.notes ?? undefined,
  status: row.status,
  completedAt: row.completed_at ?? undefined,
});

const toTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  dueDate: row.due_date ?? 'Sin fecha',
  priority: row.priority,
  completed: row.completed,
  category: row.category,
});

const toPomodoroLog = (row: PomodoroLogRow): PomodoroLog => ({
  id: row.id,
  sessionId: row.study_session_id ?? undefined,
  subject: row.study_sessions?.[0]?.subject,
  durationMinutes: row.duration_minutes,
  completedAt: row.completed_at,
});

async function getUserId(): Promise<string> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    throw new Error('Debes iniciar sesión para acceder a tus datos.');
  }
  return data.user.id;
}

function throwIfError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

// Sessions

export const getSessions = async (): Promise<Session[]> => {
  const { data, error } = await supabase
    .from('study_sessions')
    .select('*')
    .order('scheduled_date', { ascending: true })
    .order('start_time', { ascending: true });
  throwIfError(error);
  return (data as SessionRow[]).map(toSession);
};

export const addSession = async (session: NewSession): Promise<Session[]> => {
  const userId = await getUserId();
  const { error } = await supabase.from('study_sessions').insert({
    user_id: userId,
    subject: session.subject,
    topic: session.topic,
    scheduled_date: session.date,
    start_time: session.startTime,
    end_time: session.endTime,
    priority: session.priority,
    location: session.location || null,
    notes: session.notes || null,
  });
  throwIfError(error);
  return getSessions();
};

export const deleteSession = async (sessionId: string): Promise<Session[]> => {
  const { error } = await supabase
    .from('study_sessions')
    .delete()
    .eq('id', sessionId);
  throwIfError(error);
  return getSessions();
};

export const updateSession = async (
  sessionId: string,
  updates: Partial<Omit<Session, 'id'>>,
): Promise<Session[]> => {
  const payload = {
    ...(updates.subject !== undefined && { subject: updates.subject }),
    ...(updates.topic !== undefined && { topic: updates.topic }),
    ...(updates.date !== undefined && { scheduled_date: updates.date }),
    ...(updates.startTime !== undefined && { start_time: updates.startTime }),
    ...(updates.endTime !== undefined && { end_time: updates.endTime }),
    ...(updates.priority !== undefined && { priority: updates.priority }),
    ...(updates.location !== undefined && {
      location: updates.location || null,
    }),
    ...(updates.notes !== undefined && { notes: updates.notes || null }),
    ...(updates.status !== undefined && { status: updates.status }),
    ...(updates.completedAt !== undefined && {
      completed_at: updates.completedAt,
    }),
  };
  const { error } = await supabase
    .from('study_sessions')
    .update(payload)
    .eq('id', sessionId);
  throwIfError(error);
  return getSessions();
};

export const completeSession = async (sessionId: string): Promise<Session[]> =>
  updateSession(sessionId, {
    status: 'completed',
    completedAt: new Date().toISOString(),
  });

// Tasks

export const getTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('completed', { ascending: true })
    .order('due_date', { ascending: true, nullsFirst: false });
  throwIfError(error);
  return (data as TaskRow[]).map(toTask);
};

export const addTask = async (task: NewTask): Promise<Task[]> => {
  const userId = await getUserId();
  const { error } = await supabase.from('tasks').insert({
    user_id: userId,
    title: task.title,
    due_date: task.dueDate === 'Sin fecha' ? null : task.dueDate,
    priority: task.priority,
    category: task.category,
  });
  throwIfError(error);
  return getTasks();
};

export const toggleTaskCompleted = async (taskId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('completed')
    .eq('id', taskId)
    .single();
  throwIfError(error);
  if (!data) throw new Error('No encontramos la tarea solicitada.');
  const { error: updateError } = await supabase
    .from('tasks')
    .update({ completed: !data.completed })
    .eq('id', taskId);
  throwIfError(updateError);
  return getTasks();
};

export const deleteTask = async (taskId: string): Promise<Task[]> => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskId);
  throwIfError(error);
  return getTasks();
};

export const updateTask = async (
  taskId: string,
  updates: Partial<Omit<Task, 'id'>>,
): Promise<Task[]> => {
  const payload = {
    ...(updates.title !== undefined && { title: updates.title }),
    ...(updates.dueDate !== undefined && {
      due_date: updates.dueDate === 'Sin fecha' ? null : updates.dueDate,
    }),
    ...(updates.priority !== undefined && { priority: updates.priority }),
    ...(updates.category !== undefined && { category: updates.category }),
    ...(updates.completed !== undefined && { completed: updates.completed }),
  };
  const { error } = await supabase
    .from('tasks')
    .update(payload)
    .eq('id', taskId);
  throwIfError(error);
  return getTasks();
};

// Pomodoro logs

export const getPomodoroLogs = async (): Promise<PomodoroLog[]> => {
  const { data, error } = await supabase
    .from('pomodoro_logs')
    .select(
      'id, study_session_id, duration_minutes, completed_at, study_sessions(subject)',
    )
    .order('completed_at', { ascending: false });
  throwIfError(error);
  return (data as PomodoroLogRow[]).map(toPomodoroLog);
};

export const addPomodoroLog = async (
  sessionId: string | null,
  durationMinutes: number,
): Promise<PomodoroLog[]> => {
  const userId = await getUserId();
  const { error } = await supabase.from('pomodoro_logs').insert({
    user_id: userId,
    study_session_id: sessionId,
    duration_minutes: durationMinutes,
  });
  throwIfError(error);
  return getPomodoroLogs();
};
