import { formatDistanceToNow, format } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formats a date to a relative time string
 * Example: "hace 2 horas", "hace 3 días"
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
    locale: es,
  });
}

/**
 * Formats a date to a readable string
 * Example: "25 de octubre de 2025"
 */
export function formatDate(date: Date | string, formatStr = 'PPP'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return format(dateObj, formatStr, {
    locale: es,
  });
}

/**
 * Formats a date to include time
 * Example: "25 oct 2025, 14:30"
 */
export function formatDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return format(dateObj, "d MMM yyyy, HH:mm", {
    locale: es,
  });
}
