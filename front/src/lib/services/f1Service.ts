import { GrandPrix, Session, Meeting, Driver, Position, Lap, Grid, LapTime, Stint } from "@/lib/types/racing";

const BASE_URL = "https://api.openf1.org/v1";

// Helper function to build URL with query parameters
const buildUrl = (url: string, params?: Record<string, string>): string => {
  if (!params || Object.keys(params).length === 0) {
    return url;
  }
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });
  return `${url}?${searchParams.toString()}`;
};

// Helper function to handle fetch requests
const fetchData = async <T>(url: string, params?: Record<string, string>): Promise<T> => {
  const fullUrl = buildUrl(url, params);
  const response = await fetch(fullUrl);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const f1Service = {
  async getSessions(year?: string): Promise<Session[]> {
    const url = `${BASE_URL}/sessions`;
    const params = year ? { year } : undefined;
    return fetchData<Session[]>(url, params);
  },

  async getMeetings(year?: string): Promise<Meeting[]> {
    const url = `${BASE_URL}/meetings`;
    const params = year ? { year } : undefined;
    return fetchData<Meeting[]>(url, params);
  },

  async getDrivers(sessionKey: string): Promise<Driver[]> {
    const url = `${BASE_URL}/drivers`;
    return fetchData<Driver[]>(url, { session_key: sessionKey });
  },

  async getPositions(sessionKey: string): Promise<Position[]> {
    const url = `${BASE_URL}/position`;
    return fetchData<Position[]>(url, { session_key: sessionKey });
  },

  async getLaps(sessionKey: string): Promise<Lap[]> {
    const url = `${BASE_URL}/laps`;
    return fetchData<Lap[]>(url, { session_key: sessionKey });
  },

  async getGrid(sessionKey: string): Promise<Grid[]> {
    const url = `${BASE_URL}/starting_grid`;
    return fetchData<Grid[]>(url, { session_key: sessionKey });
  },

  async getLapTimes(sessionKey: string): Promise<LapTime[]> {
    const url = `${BASE_URL}/lap_times`;
    return fetchData<LapTime[]>(url, { session_key: sessionKey });
  },

  async getStints(sessionKey: string): Promise<Stint[]> {
    const url = `${BASE_URL}/stints`;
    return fetchData<Stint[]>(url, { session_key: sessionKey });
  },

  transformToGrandPrix(session: Session, meeting: Meeting): GrandPrix {
    const date = new Date(session.startTime);
    return {
      id: session.id.toString(),
      date: date.toISOString().split('T')[0],
      time: date.toTimeString().split(' ')[0],
      season: date.getFullYear().toString(),
      track: meeting.track,
      status: session.status,
      type: session.type,
    };
  }
}; 