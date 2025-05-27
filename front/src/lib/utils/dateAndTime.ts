import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    if (!dateString) return "";
    const date = parseISO(dateString);
    if (isNaN(date.getTime())) return "";
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export function formatLapTime(lapTime?: number | string): string {
  if (lapTime === undefined || lapTime === null) return "";
  
  // Convert string to number if needed
  const timeValue = typeof lapTime === 'string' ? parseFloat(lapTime) : lapTime;
  
  if (isNaN(timeValue)) return "";
  
  const minutes = Math.floor(timeValue / 60);
  const seconds = (timeValue % 60).toFixed(3).padStart(6, "0");
  return `${minutes}:${seconds}`;
}

export function formatRemainingTime(seconds: number): string {
  if (seconds <= 0 || isNaN(seconds)) return "00:00";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

export function formatTimeForAPI(time: string | Date): string {
  try {
    const date = typeof time === 'string' ? new Date(time) : time;
    if (isNaN(date.getTime())) return "";
    return date.toISOString();
  } catch (error) {
    console.error("Error formatting time for API:", error);
    return "";
  }
}