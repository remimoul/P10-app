import { Constructor, TeamStats } from "../types/drivers";

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
    ConstructorTable?: T;
    StandingsTable?: T;
  };
}

interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
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

export const teamService = {
  async getCurrentConstructors(): Promise<Constructor[]> {
    try {
      const response = await fetch(`${ERGAST_API_BASE}/current/constructors.json`);
      const data: ErgastResponse<{ Constructors: Constructor[] }> = await response.json();
      return data.MRData.ConstructorTable?.Constructors ?? [];
    } catch (error) {
      console.error("Error fetching current constructors:", error);
      throw error;
    }
  },

  async getConstructorStandings(): Promise<ConstructorStanding[]> {
    try {
      const response = await fetch(`${ERGAST_API_BASE}/current/constructorStandings.json`);
      const data: ErgastResponse<{ StandingsLists: { ConstructorStandings: ConstructorStanding[] }[] }> = await response.json();
      return data.MRData.StandingsTable?.StandingsLists[0].ConstructorStandings ?? [];
    } catch (error) {
      console.error("Error fetching constructor standings:", error);
      throw error;
    }
  },

  async getConstructorResults(constructorId: string, limit: number = 5): Promise<number[]> {
    try {
      const response = await fetch(
        `${ERGAST_API_BASE}/current/constructors/${constructorId}/results.json?limit=${limit}`
      );
      const data: ErgastResponse<{ Races: Race[] }> = await response.json();
      return data.MRData.RaceTable?.Races.map((race) => {
        const positions = race.Results.map((result) => parseInt(result.position));
        return Math.min(...positions);
      }) ?? [];
    } catch (error) {
      console.error(`Error fetching results for constructor ${constructorId}:`, error);
      throw error;
    }
  },

  async getTeamStats(constructorId: string): Promise<TeamStats> {
    try {
      const [standings, results] = await Promise.all([
        this.getConstructorStandings(),
        this.getConstructorResults(constructorId),
      ]);

      const constructorStanding = standings.find(
        (standing) => standing.Constructor.constructorId === constructorId
      );

      if (!constructorStanding) {
        throw new Error(`Constructor ${constructorId} not found in standings`);
      }

      const averagePosition =
        results.reduce((sum, position) => sum + position, 0) / results.length;

      return {
        constructorId,
        name: constructorStanding.Constructor.name,
        stats: {
          points: parseInt(constructorStanding.points),
          wins: parseInt(constructorStanding.wins),
          podiums: 0,
          fastestLaps: 0,
          averagePosition,
          reliability: 0.95,
        },
      };
    } catch (error) {
      console.error(`Error fetching stats for constructor ${constructorId}:`, error);
      throw error;
    }
  },

  async getAllTeamsStats(): Promise<TeamStats[]> {
    try {
      const constructors = await this.getCurrentConstructors();
      const statsPromises = constructors.map((constructor) =>
        this.getTeamStats(constructor.constructorId)
      );
      return Promise.all(statsPromises);
    } catch (error) {
      console.error("Error fetching all teams stats:", error);
      throw error;
    }
  },
}; 