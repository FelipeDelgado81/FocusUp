import type { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
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
}

export function getWeeklyData(sessions: Session[]): number[] {
  const now = new Date();
  const startOfWeek = new Date(now);
  const dayOfWeek = now.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startOfWeek.setDate(now.getDate() - diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const counts = DAY_LABELS.map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return sessions.filter((session) => session.date === formatDateKey(day))
      .length;
  });

  const max = Math.max(...counts, 1);
  return counts.map((count) => Math.round((count / max) * 100));
}

export function getSubjectStats(sessions: Session[]): SubjectStat[] {
  const subjectCount: Record<string, number> = {};

  for (const session of sessions) {
    subjectCount[session.subject] = (subjectCount[session.subject] || 0) + 1;
  }

  const total = sessions.length || 1;

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

export function getStreak(sessions: Session[]): number {
  if (sessions.length === 0) return 0;

  const dates = [...new Set(sessions.map((session) => session.date))]
    .sort()
    .reverse();
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

export function getMetricsSummary(
  sessions: Session[],
  tasks: Task[],
): MetricsSummary {
  const today = getTodayDateKey();

  return {
    weeklyData: getWeeklyData(sessions),
    subjectStats: getSubjectStats(sessions),
    streak: getStreak(sessions),
    totalSessions: sessions.length,
    completedTasks: tasks.filter((task) => task.completed).length,
    todaySessions: sessions.filter((session) => session.date === today).length,
  };
}
