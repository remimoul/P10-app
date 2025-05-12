import { motion } from "framer-motion";
import { RiLockFill, RiEarthFill } from "react-icons/ri";
import UserCard from "@/components/Leagues/ViewLeagues/UserCard";
import { Participant } from "@/types";

// Icone privée/publique
const LeagueTypeIcon = ({ type }: { type: string }) => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md">
    {type === "public" ? (
      <RiEarthFill className="text-2xl text-red-500" />
    ) : (
      <RiLockFill className="text-2xl text-red-500" />
    )}
  </div>
);

interface HeaderProps {
  league: {
    name: string;
    type: "public" | "private";
  };
  timeLeft: number;
  formatTime: (sec: number) => string;
  handleAddMembers: () => void;
  handleLeaveLeague: () => void;
  participant?: Participant;
  rank?: number | null;
  handleVote: () => void;
}

const Header = ({
  league,
  timeLeft,
  formatTime,
  handleAddMembers,
  handleLeaveLeague,
  participant,
  rank,
  handleVote,
}: HeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-white to-red-50 p-8 text-black shadow-lg"
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight">
              {league.name}
              <span className="text-lg font-medium mt-2 opacity-80 flex items-center gap-2">
                <LeagueTypeIcon type={league.type} />
                {league.type === "public" ? "Public League" : "Private League"}
              </span>
            </h1>
          </div>
        </div>

        {participant && (
            <UserCard
              participant={participant}
              timeLeft={timeLeft}
              rank={rank}
              handleVote={handleVote}
              isButton={false}
            />
        )}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-xl font-medium opacity-90">
          Season 2024 • Round 12 • Circuit de Monaco
        </span>
      </div>
    </motion.div>
  );
};

export default Header;
