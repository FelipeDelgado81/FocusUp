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
    hour12: true,
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
  const clean = value.replace(/\s*(AM|PM)/i, '').trim();
  const parts = clean.split(':');
  if (parts.length < 2) return null;

  const date = new Date();
  date.setHours(
    Number.parseInt(parts[0], 10),
    Number.parseInt(parts[1], 10),
    0,
    0,
  );

  return Number.isNaN(date.getTime()) ? null : date;
}
