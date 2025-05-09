import { GrandPrix, Session, Meeting, Driver, Position, Lap, Grid, LapTime, Stint } from "@/lib/types/racing";

const BASE_URL = "https://api.openf1.org/v1";

export const f1Service = {
  async getSessions(year?: string): Promise<Session[]> {
    const url = new URL(`${BASE_URL}/sessions`);
    if (year) {
      url.searchParams.append("year", year);
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch sessions");
    }
    return response.json();
  },

  async getMeetings(year?: string): Promise<Meeting[]> {
    const url = new URL(`${BASE_URL}/meetings`);
    if (year) {
      url.searchParams.append("year", year);
    }
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch meetings");
    }
    return response.json();
  },

  async getDrivers(sessionKey: string): Promise<Driver[]> {
    const url = new URL(`${BASE_URL}/drivers`);
    url.searchParams.append("session_key", sessionKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch drivers");
    }
    return response.json();
  },

  async getPositions(sessionKey: string): Promise<Position[]> {
    const url = new URL(`${BASE_URL}/position`);
    url.searchParams.append("session_key", sessionKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch positions");
    }
    return response.json();
  },

  async getLaps(sessionKey: string): Promise<Lap[]> {
    const url = new URL(`${BASE_URL}/laps`);
    url.searchParams.append("session_key", sessionKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch laps");
    }
    return response.json();
  },

  async getGrid(sessionKey: string): Promise<Grid[]> {
    const url = new URL(`${BASE_URL}/starting_grid`);
    url.searchParams.append("session_key", sessionKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch starting grid");
    }
    return response.json();
  },

  async getLapTimes(sessionKey: string): Promise<LapTime[]> {
    const url = new URL(`${BASE_URL}/lap_times`);
    url.searchParams.append("session_key", sessionKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch lap times");
    }
    return response.json();
  },

  async getStints(sessionKey: string): Promise<Stint[]> {
    const url = new URL(`${BASE_URL}/stints`);
    url.searchParams.append("session_key", sessionKey);
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error("Failed to fetch stints");
    }
    return response.json();
  },

  transformToGrandPrix(session: Session, meeting: Meeting): GrandPrix {
    const date = new Date(session.date_start);
    return {
      id: session.session_key.toString(),
      date: date.toISOString().split('T')[0],
      time: date.toTimeString().split(' ')[0],
      season: session.year.toString(),
      track: {
        id: meeting.meeting_key.toString(),
        trackName: meeting.circuit_short_name,
        countryName: meeting.country_code,
        location: meeting.location,
      },
      status: session.session_status,
      type: session.session_type,
    };
  }
}; 