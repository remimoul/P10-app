import axios from "axios";
import { GrandPrix, Session, Meeting, Driver, Position, Lap, Grid, LapTime, Stint } from "@/lib/types/racing";

const BASE_URL = "https://api.openf1.org/v1";

export const f1Service = {
  async getSessions(year?: string): Promise<Session[]> {
    const url = `${BASE_URL}/sessions`;
    const params = year ? { year } : {};
    const response = await axios.get(url, { params });
    return response.data;
  },

  async getMeetings(year?: string): Promise<Meeting[]> {
    const url = `${BASE_URL}/meetings`;
    const params = year ? { year } : {};
    const response = await axios.get(url, { params });
    return response.data;
  },

  async getDrivers(sessionKey: string): Promise<Driver[]> {
    const url = `${BASE_URL}/drivers`;
    const response = await axios.get(url, { params: { session_key: sessionKey } });
    return response.data;
  },

  async getPositions(sessionKey: string): Promise<Position[]> {
    const url = `${BASE_URL}/position`;
    const response = await axios.get(url, { params: { session_key: sessionKey } });
    return response.data;
  },

  async getLaps(sessionKey: string): Promise<Lap[]> {
    const url = `${BASE_URL}/laps`;
    const response = await axios.get(url, { params: { session_key: sessionKey } });
    return response.data;
  },

  async getGrid(sessionKey: string): Promise<Grid[]> {
    const url = `${BASE_URL}/starting_grid`;
    const response = await axios.get(url, { params: { session_key: sessionKey } });
    return response.data;
  },

  async getLapTimes(sessionKey: string): Promise<LapTime[]> {
    const url = `${BASE_URL}/lap_times`;
    const response = await axios.get(url, { params: { session_key: sessionKey } });
    return response.data;
  },

  async getStints(sessionKey: string): Promise<Stint[]> {
    const url = `${BASE_URL}/stints`;
    const response = await axios.get(url, { params: { session_key: sessionKey } });
    return response.data;
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