import type { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import type { PomodoroLog } from '../storage/asyncStorage';
import type { Session } from '../hooks/useSessions';
import type { Task } from '../storage/asyncStorage';
import { formatDateKey, getTodayDateKey } from './date';

export const DAY_LABELS: string[] = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

const SUBJECT_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Matemáticas: 'calculate',
  'Matemáticas Avanzadas': 'calculate',
  Historia: 'history-edu',
  'Historia Universal': 'history-edu',
  Programación: 'code',
  Biología: 'biotech',
  'Biología Molecular': 'biotech',
  default: 'book',
};

const SUBJECT_COLORS_LIST = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.tertiary,
  COLORS.primaryContainer,
  COLORS.tertiaryContainer,
];

export interface SubjectStat {
  name: string;
  count: number;
  percent: number;
  color: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

export interface MetricsSummary {
  weeklyData: number[];
  subjectStats: SubjectStat[];
  streak: number;
  totalSessions: number;
  completedTasks: number;
  todaySessions: number;
  totalStudyMinutes: number;
}

function getLogDateKey(log: PomodoroLog): string {
  return formatDateKey(new Date(log.completedAt));
}

export function getWeeklyData(
  sessions: Session[],
  logs: PomodoroLog[] = [],
): number[] {
  const completedSessions = sessions.filter(
    (session) => session.status === 'completed',
  );
  const now = new Date();
  const startOfWeek = new Date(now);
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const counts = DAY_LABELS.map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    const dateKey = formatDateKey(day);
    if (logs.length > 0) {
      return logs.filter((log) => getLogDateKey(log) === dateKey).length;
    }
    return completedSessions.filter((session) => session.date === dateKey)
      .length;
  });

  const max = Math.max(...counts, 1);
  return counts.map((count) => Math.round((count / max) * 100));
}

export function getSubjectStats(
  sessions: Session[],
  logs: PomodoroLog[] = [],
): SubjectStat[] {
  const completedSessions = sessions.filter(
    (session) => session.status === 'completed',
  );
  const subjectCount: Record<string, number> = {};

  if (logs.length > 0) {
    for (const log of logs) {
      const subject = log.subject ?? 'Sin asignar';
      subjectCount[subject] = (subjectCount[subject] || 0) + 1;
    }
  } else {
    for (const session of completedSessions) {
      subjectCount[session.subject] = (subjectCount[session.subject] || 0) + 1;
    }
  }

  const total = logs.length || completedSessions.length || 1;

  return Object.entries(subjectCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count], index) => ({
      name,
      count,
      percent: Math.round((count / total) * 100),
      color: SUBJECT_COLORS_LIST[index % SUBJECT_COLORS_LIST.length],
      icon: SUBJECT_ICONS[name] || SUBJECT_ICONS.default,
    }));
}

export function getStreak(
  sessions: Session[],
  logs: PomodoroLog[] = [],
): number {
  const completedSessions = sessions.filter(
    (session) => session.status === 'completed',
  );
  if (completedSessions.length === 0 && logs.length === 0) return 0;

  const dateValues =
    logs.length > 0
      ? logs.map(getLogDateKey)
      : completedSessions.map((session) => session.date);
  const dates = [...new Set(dateValues)].sort().reverse();
  let streak = 0;
  const expected = new Date();

  for (const dateStr of dates) {
    const expectedStr = formatDateKey(expected);

    if (dateStr === expectedStr) {
      streak += 1;
      expected.setDate(expected.getDate() - 1);
    } else if (dateStr < expectedStr) {
      break;
    }
  }

  return streak;
}

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function getTotalStudyMinutes(sessions: Session[]): number {
  return sessions
    .filter((session) => session.status === 'completed')
    .reduce((total, session) => {
      const start = parseTimeToMinutes(session.startTime);
      const end = parseTimeToMinutes(session.endTime);
      const duration = end - start;
      return total + (duration > 0 ? duration : 0);
    }, 0);
}

export function getTotalPomodoroMinutes(logs: PomodoroLog[]): number {
  return logs.reduce((total, log) => total + log.durationMinutes, 0);
}

export function formatStudyTime(minutes: number): string {
  if (minutes === 0) return '0 min';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function getMetricsSummary(
  sessions: Session[],
  tasks: Task[],
  logs: PomodoroLog[] = [],
): MetricsSummary {
  const today = getTodayDateKey();
  const todayLogCount = logs.filter(
    (log) => getLogDateKey(log) === today,
  ).length;

  return {
    weeklyData: getWeeklyData(sessions, logs),
    subjectStats: getSubjectStats(sessions, logs),
    streak: getStreak(sessions, logs),
    totalSessions: sessions.length,
    completedTasks: tasks.filter((task) => task.completed).length,
    todaySessions:
      logs.length > 0
        ? todayLogCount
        : sessions.filter(
            (session) =>
              session.date === today && session.status === 'completed',
          ).length,
    totalStudyMinutes:
      logs.length > 0
        ? getTotalPomodoroMinutes(logs)
        : getTotalStudyMinutes(sessions),
  };
}
