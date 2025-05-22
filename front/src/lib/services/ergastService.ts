import axios from "axios";
import { ErgastRace, ErgastResponse, CircuitInfo } from "@/lib/types/ergast";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export interface ErgastLocation {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface ErgastCircuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: ErgastLocation;
  length?: string;
  numberOfLaps?: string;
  lapRecord?: {
    time: string;
    driver: string;
    year: string;
  };
}

export interface ErgastResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
  grid: string;
  laps: string;
  status: string;
  Time?: {
    millis: string;
    time: string;
  };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
}

export class ErgastService {
  private async fetchData<T>(endpoint: string): Promise<T> {
    try {
      const response = await axios.get<T>(`${BASE_URL}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async getRaces(season?: string): Promise<ErgastRace[]> {
    try {
      const endpoint = season ? `${season}.json` : "current.json";
      const response = await this.fetchData<ErgastResponse<ErgastRace>>(endpoint);
      const races = response.MRData.RaceTable.Races;

      const racesWithCircuitInfo = await Promise.all(
        races.map(async (race) => {
          const circuitInfo = await this.getCircuitInfo(race.Circuit.circuitId);
          return {
            ...race,
            circuitInfo: circuitInfo || undefined,
          };
        })
      );

      return racesWithCircuitInfo;
    } catch (error) {
      console.error("Error fetching races:", error);
      return [];
    }
  }

  async getCircuitInfo(circuitId: string): Promise<CircuitInfo | null> {
    try {
      const response = await this.fetchData<ErgastResponse<ErgastCircuit>>(
        `circuits/${circuitId}.json`
      );
      const circuit = response?.MRData?.RaceTable?.Races?.[0];

      if (!circuit) return null;

      return {
        length: circuit.length || "N/A",
        numberOfLaps: circuit.numberOfLaps || "N/A",
        lapRecord: circuit.lapRecord || {
          time: "N/A",
          driver: "N/A",
          year: "N/A",
        },
      };
    } catch (error) {
      console.error(`Error fetching circuit info for ${circuitId}:`, error);
      return null;
    }
  }

  async getRaceResults(
    season: string,
    round: string
  ): Promise<ErgastRace | null> {
    try {
      const response = await this.fetchData<ErgastResponse<ErgastRace>>(
        `${season}/${round}/results.json`
      );
      const race = response?.MRData?.RaceTable?.Races?.[0];

      if (!race) return null;

      const circuitInfo = await this.getCircuitInfo(race.Circuit.circuitId);

      return {
        ...race,
        circuitInfo: circuitInfo || undefined,
      };
    } catch (error) {
      console.error(
        `Error fetching race results for ${season}/${round}:`,
        error
      );
      return null;
    }
  }

  async getLatestResults(): Promise<ErgastRace[]> {
    try {
      const response = await this.fetchData<ErgastResponse<ErgastRace>>("current.json");
      const races = response?.MRData?.RaceTable?.Races || [];

      const racesWithResults = await Promise.all(
        races.map(async (race) => {
          const [results, circuitInfo] = await Promise.all([
            this.getRaceResults(race.season, race.round),
            this.getCircuitInfo(race.Circuit.circuitId),
          ]);

          return {
            ...race,
            results: results?.results || [],
            circuitInfo: circuitInfo || undefined,
          };
        })
      );

      return racesWithResults;
    } catch (error) {
      console.error("Error fetching latest results:", error);
      return [];
    }
  }
}

export const ergastService = new ErgastService();
