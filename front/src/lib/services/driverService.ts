import { Driver, DriverStanding, DriverStats } from "../types/drivers";

const ERGAST_API_BASE = "http://ergast.com/api/f1";

interface ErgastResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable?: T;
    DriverTable?: T;
    StandingsTable?: T;
  };
}

interface DriverStandingResponse {
  position: string;
  positionText: string;
  points: string;
  wins: string;
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
  Constructors: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  }[];
}

interface RaceResult {
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

interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    url: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  Results: RaceResult[];
}

export const driverService = {
  async getCurrentDrivers(): Promise<Driver[]> {
    try {
      const response = await fetch(`${ERGAST_API_BASE}/current/drivers.json`);
      const data: ErgastResponse<{ Drivers: Driver[] }> = await response.json();
      return data.MRData.DriverTable?.Drivers ?? [];
    } catch (error) {
      console.error("Error fetching current drivers:", error);
      throw error;
    }
  },

  async getDriverStandings(): Promise<DriverStanding[]> {
    try {
      const response = await fetch(`${ERGAST_API_BASE}/current/driverStandings.json`);
      const data: ErgastResponse<{ StandingsLists: { DriverStandings: DriverStandingResponse[] }[] }> = await response.json();
      return data.MRData.StandingsTable?.StandingsLists[0].DriverStandings ?? [];
    } catch (error) {
      console.error("Error fetching driver standings:", error);
      throw error;
    }
  },

  async getDriverResults(driverId: string, limit: number = 5): Promise<number[]> {
    try {
      const response = await fetch(
        `${ERGAST_API_BASE}/current/drivers/${driverId}/results.json?limit=${limit}`
      );
      const data: ErgastResponse<{ Races: Race[] }> = await response.json();
      return data.MRData.RaceTable?.Races.map((race) => parseInt(race.Results[0].position)) ?? [];
    } catch (error) {
      console.error(`Error fetching results for driver ${driverId}:`, error);
      throw error;
    }
  },

  async getDriverStats(driverId: string): Promise<DriverStats> {
    try {
      const [standings, results] = await Promise.all([
        this.getDriverStandings(),
        this.getDriverResults(driverId),
      ]);

      const driverStanding = standings.find(
        (standing) => standing.Driver.driverId === driverId
      );

      if (!driverStanding) {
        throw new Error(`Driver ${driverId} not found in standings`);
      }

      const averagePosition =
        results.reduce((sum, position) => sum + position, 0) / results.length;

      return {
        driverId,
        name: `${driverStanding.Driver.givenName} ${driverStanding.Driver.familyName}`,
        team: driverStanding.Constructors[0].name,
        stats: {
          previousRaces: results,
          averagePosition,
          teamPerformance: 0.8,
          points: parseInt(driverStanding.points),
          wins: parseInt(driverStanding.wins),
          podiums: 0,
          fastestLaps: 0,
        },
      };
    } catch (error) {
      console.error(`Error fetching stats for driver ${driverId}:`, error);
      throw error;
    }
  },

  async getAllDriversStats(): Promise<DriverStats[]> {
    try {
      const drivers = await this.getCurrentDrivers();
      const statsPromises = drivers.map((driver) => this.getDriverStats(driver.driverId));
      return Promise.all(statsPromises);
    } catch (error) {
      console.error("Error fetching all drivers stats:", error);
      throw error;
    }
  },
}; 