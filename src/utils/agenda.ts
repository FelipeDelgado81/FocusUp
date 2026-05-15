import type { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { formatDateKey } from './date';

export const WEEK_DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const MONTH_NAMES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const SUBJECT_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  Matemáticas: 'functions',
  Historia: 'history-edu',
  Programación: 'terminal',
  default: 'book',
};

export const PRIORITY_ICON_BG: Record<string, string> = {
  ALTA: COLORS.primaryFixed,
  MEDIA: COLORS.secondaryContainer + '50',
  BAJA: COLORS.tertiaryFixed,
};

export const PRIORITY_ICON_COLOR: Record<string, string> = {
  ALTA: COLORS.onPrimaryFixedVariant,
  MEDIA: COLORS.onSecondaryContainer,
  BAJA: COLORS.onTertiaryFixedVariant,
};

export function getWeekDates(referenceDate: Date): Date[] {
  const dayOfWeek = referenceDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });
}

export function isSameDay(a: Date, b: Date): boolean {
  return formatDateKey(a) === formatDateKey(b);
}

export function getMonthLabel(date: Date): string {
  return `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}
