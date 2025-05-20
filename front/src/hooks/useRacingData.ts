import { useState, useEffect } from 'react';
import { ergastService } from '@/lib/services/ergastService';
import { formatDate } from '@/lib/utils/dateAndTime';

interface RacingData {
  season: string;
  races: {
    round: string;
    raceName: string;
    date: string;
    circuit: {
      name: string;
      location: {
        locality: string;
        country: string;
      };
      length: string;
      numberOfLaps: string;
      lapRecord: {
        time: string;
        driver: string;
        year: string;
      };
    };
    results?: {
      position: string;
      driver: {
        name: string;
        number: string;
        nationality: string;
      };
      constructor: string;
      grid: string;
      status: string;
      points: string;
      time?: string;
      fastestLap?: {
        time: string;
        rank: string;
      };
    }[];
  }[];
  loading: boolean;
  error: string | null;
}

export const useRacingData = (season?: string): RacingData => {
  const [data, setData] = useState<RacingData>({
    season: '',
    races: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const races = await ergastService.getRaces(season);
        
        const formattedRaces = await Promise.all(
          races.map(async (race) => {
            const results = await ergastService.getRaceResults(race.season, race.round);
            
            return {
              round: race.round,
              raceName: race.raceName,
              date: formatDate(race.date),
              circuit: {
                name: race.Circuit.circuitName,
                location: race.Circuit.Location,
                length: race.circuitInfo?.length || "N/A",
                numberOfLaps: race.circuitInfo?.numberOfLaps || "N/A",
                lapRecord: race.circuitInfo?.lapRecord || {
                  time: "N/A",
                  driver: "N/A",
                  year: "N/A",
                },
              },
              results: results?.results?.map((result) => ({
                position: result.position,
                driver: {
                  name: `${result.Driver.givenName} ${result.Driver.familyName}`,
                  number: result.Driver.permanentNumber,
                  nationality: result.Driver.nationality,
                },
                constructor: result.Constructor.name,
                grid: result.grid,
                status: result.status,
                points: result.points,
                time: result.Time?.time,
                fastestLap: result.FastestLap ? {
                  time: result.FastestLap.Time.time,
                  rank: result.FastestLap.rank,
                } : undefined,
              })),
            };
          })
        );

        setData({
          season: races[0]?.season || '',
          races: formattedRaces,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching racing data:', error);
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to fetch racing data',
        }));
      }
    };

    fetchData();
  }, [season]);

  return data;
}; 