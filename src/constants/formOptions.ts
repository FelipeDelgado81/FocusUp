import type { ThemeColors } from './theme';

export const SUBJECTS: string[] = [
  'Matemáticas Avanzadas',
  'Historia Universal',
  'Biología Molecular',
  'Literatura Contemporánea',
  'Programación',
  'Física',
  'Química',
  'Inglés',
];

export const TASK_CATEGORIES: string[] = [
  'Historia',
  'Matemáticas',
  'Ciencias',
  'Arte',
  'Programación',
  'Idiomas',
];

export interface PriorityOption {
  label: string;
  value: string;
  dot: string;
  activeBg: string;
  border: string;
}

export const getPriorities = (COLORS: ThemeColors): PriorityOption[] => [
  {
    label: 'Alta',
    value: 'ALTA',
    dot: COLORS.error,
    activeBg: COLORS.errorContainer + '50',
    border: COLORS.error,
  },
  {
    label: 'Media',
    value: 'MEDIA',
    dot: COLORS.tertiary,
    activeBg: COLORS.tertiaryFixed,
    border: COLORS.tertiary,
  },
  {
    label: 'Baja',
    value: 'BAJA',
    dot: COLORS.secondary,
    activeBg: COLORS.secondaryContainer + '50',
    border: COLORS.secondary,
  },
];
