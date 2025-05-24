import { VoteStats } from "@/components/vote/VoteStats";
import { RaceInfo } from "./RaceInfo";
import { VoteRules } from "@/components/vote/VoteRules";
import { DriverStats } from "@/lib/types/drivers";

interface InfoSectionProps {
  drivers: DriverStats[];
  raceInfo: {
    grandPrix: string;
    country: string;
    circuit: string;
    location: string;
    date: string;
    startTime: string;
    weather?: string;
    temperature?: string;
    humidity?: string;
  };
  totalVotes: number;
  totalParticipants: number;
  topVotedDrivers: { driverId: string; votes: number }[];
}

export const InfoSection = ({
  drivers,
  raceInfo,
  totalVotes,
  totalParticipants,
  topVotedDrivers,
}: InfoSectionProps) => {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <VoteStats
          totalVotes={totalVotes}
          totalParticipants={totalParticipants}
          topVotedDrivers={topVotedDrivers}
          drivers={drivers}
        />

        <RaceInfo 
          raceInfo={{
            grandPrix: raceInfo.grandPrix || "",
            country: raceInfo.country,
            circuit: raceInfo.circuit,
            location: raceInfo.location,
            date: raceInfo.date,
            startTime: raceInfo.startTime || "",
            weather: raceInfo.weather,
            temperature: raceInfo.temperature,
            humidity: raceInfo.humidity,
          }}
        />
      </div>

      <VoteRules />
    </div>
  );
};
