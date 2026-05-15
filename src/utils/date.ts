export function formatDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTodayDateKey(): string {
  return formatDateKey(new Date());
}
