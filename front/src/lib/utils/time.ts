export function formatLapTime(lapTime?: number): string {
  if (lapTime === undefined || lapTime === null || isNaN(lapTime)) return "";
  const minutes = Math.floor(lapTime / 60);
  const seconds = (lapTime % 60).toFixed(3).padStart(6, '0');
  return `${minutes}:${seconds}`;
} 