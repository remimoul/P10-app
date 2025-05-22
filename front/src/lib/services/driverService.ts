import { Driver, DriverStanding, DriverStats } from "../types/drivers";
import { ErgastResponse, DriverStandingResponse, Race } from "../types/ergast";

const ERGAST_API_BASE = "http://ergast.com/api/f1";

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
      const data: ErgastResponse<Race> = await response.json();
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