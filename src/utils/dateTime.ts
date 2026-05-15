const TIME_PARTS_PATTERN = /^(\d{1,2}):(\d{2})/;

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function parseDate(value: string): Date | null {
  const parts = value.split('-');
  if (parts.length !== 3) return null;

  const date = new Date(
    Number.parseInt(parts[0], 10),
    Number.parseInt(parts[1], 10) - 1,
    Number.parseInt(parts[2], 10),
  );

  return Number.isNaN(date.getTime()) ? null : date;
}

export function parseTime(value: string): Date | null {
  const clean = value.trim().toLowerCase();
  const match = clean.match(TIME_PARTS_PATTERN);
  if (!match) return null;

  const [, hourValue, minuteValue] = match;
  const hasAm = /\ba\.?\s*m\.?\b|\bam\b/.test(clean);
  const hasPm = /\bp\.?\s*m\.?\b|\bpm\b/.test(clean);

  let hours = Number.parseInt(hourValue, 10);
  const minutes = Number.parseInt(minuteValue, 10);

  if (hasPm && hours < 12) hours += 12;
  if (hasAm && hours === 12) hours = 0;

  if (hours > 23 || minutes > 59) return null;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function getMinutesFromTime(value: string): number | null {
  const date = parseTime(value);
  if (!date) return null;

  return date.getHours() * 60 + date.getMinutes();
}

export function isTimeRangeValid(startTime: string, endTime: string): boolean {
  const startMinutes = getMinutesFromTime(startTime);
  const endMinutes = getMinutesFromTime(endTime);

  if (startMinutes === null || endMinutes === null) return false;

  return startMinutes < endMinutes;
}
