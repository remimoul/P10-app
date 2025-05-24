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
      const [standings, resultsData] = await Promise.all([
        this.getDriverStandings(),
        fetch(`${ERGAST_API_BASE}/current/drivers/${driverId}/results.json`).then(res => res.json())
      ]);

      const driverStanding = standings.find(
        (standing) => standing.Driver.driverId === driverId
      );

      if (!driverStanding) {
        throw new Error(`Driver ${driverId} not found in standings`);
      }

      // Toutes les courses du pilote
      const races: Race[] = resultsData.MRData.RaceTable?.Races ?? [];
      const previousRaces = races.map((race: Race) => parseInt(race.Results[0].position));
      const averagePosition = previousRaces.length
        ? previousRaces.reduce((sum: number, pos: number) => sum + pos, 0) / previousRaces.length
        : 0;

      // Podiums
      const podiums = previousRaces.filter((pos: number) => pos >= 1 && pos <= 3).length;

      // Fastest laps
      const fastestLaps = races.filter((race: Race) =>
        race.Results[0].FastestLap && race.Results[0].FastestLap.rank === "1"
      ).length;

      // Team performance (moyenne des points des pilotes de l'équipe)
      const teamName = driverStanding.Constructors[0].name;
      const teamDrivers = standings.filter(
        s => s.Constructors[0].name === teamName
      );
      const teamPoints = teamDrivers.reduce(
        (sum, s) => sum + parseInt(s.points),
        0
      );
      const maxTeamPoints = Math.max(
        ...standings.reduce((arr, s) => {
          const team = s.Constructors[0].name;
          const teamSum = standings
            .filter(ss => ss.Constructors[0].name === team)
            .reduce((sum, ss) => sum + parseInt(ss.points), 0);
          arr.push(teamSum);
          return arr;
        }, [] as number[])
      );
      const teamPerformance = maxTeamPoints ? teamPoints / maxTeamPoints : 0;

      return {
        driverId,
        name: `${driverStanding.Driver.givenName} ${driverStanding.Driver.familyName}`,
        team: teamName,
        stats: {
          previousRaces,
          averagePosition,
          teamPerformance,
          points: parseInt(driverStanding.points),
          wins: parseInt(driverStanding.wins),
          podiums,
          fastestLaps,
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