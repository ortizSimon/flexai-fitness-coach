import { type ClassValue, clsx } from 'clsx';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Generate a unique session ID for the user
 */
export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `user-${timestamp}-${randomPart}`;
}

/**
 * Format timestamp to readable time
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

/**
 * Persist session ID to localStorage
 */
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId();

  const stored = localStorage.getItem('flexai_session_id');
  if (stored) return stored;

  const newId = generateSessionId();
  localStorage.setItem('flexai_session_id', newId);
  return newId;
}
