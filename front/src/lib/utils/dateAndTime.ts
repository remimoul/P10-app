import { format } from "date-fns";

export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export function formatLapTime(lapTime?: number): string {
  if (lapTime === undefined || lapTime === null || isNaN(lapTime)) return "";
  const minutes = Math.floor(lapTime / 60);
  const seconds = (lapTime % 60).toFixed(3).padStart(6, "0");
  return `${minutes}:${seconds}`;
}

export function formatRemainingTime(seconds: number): string {
  if (seconds <= 0) return "00:00";

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

export function formatRaceTime(time?: string): string {
  if (!time) return "--:--";
  if (/^\d{2}:\d{2}$/.test(time)) return time;
  if (/^\d{2}:\d{2}/.test(time)) return time.slice(0, 5);
  if (/^\d{2}\.\d{2}$/.test(time)) return time.replace(".", ":");
  if (/^\d{2}\.\d{2}/.test(time)) return time.replace(".", ":").slice(0, 5);
  return time;
}
