import { motion } from "framer-motion";
import { TiUserAdd } from "react-icons/ti";
import { GiExitDoor } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import {
  RiLockFill,
  RiEarthFill,
  RiEdit2Fill,
  RiTimerLine,
} from "react-icons/ri";
import { HeaderProps } from "@/lib/types/leagues";

const LeagueTypeIcon = ({ type }: { type: string }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#D90429]/5 to-transparent rounded-full blur-sm group-hover:blur-md transition-all duration-300" />
    <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 transition-all duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(217,4,41,0.1),_transparent_70%)] opacity-0 transition-opacity duration-300" />
      {type === "public" ? (
        <RiEarthFill className="text-2xl text-[#D90429] transition-colors duration-300 relative z-10" />
      ) : (
        <RiLockFill className="text-2xl text-[#D90429] transition-colors duration-300 relative z-10" />
      )}
    </div>
  </motion.div>
);

const Header = ({
  league,
  timeLeft,
  formatTime,
  handleAddMembers,
  handleLeaveLeague,
  handleEditLeagueName,
}: HeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 max-w-7xl mx-auto">
        <div className="text-center w-full">
          <div className="flex items-center gap-3 justify-center">
            <LeagueTypeIcon type={league.type} />
            <h1 className="text-4xl xs:text-5xl sm:text-5xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mb-4">
              {league.name}
            </h1>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 bg-gradient-to-br from-white/80 to-white/30 px-4 py-2 xs:px-6 xs:py-3 rounded-full border border-[#D90429] whitespace-nowrap w-fit mx-auto mt-2">
            <div className="flex items-center gap-1">
              <RiTimerLine className="text-xl xs:text-2xl text-[#D90429]" />
              <span className="font-mono text-lg xs:text-2xl text-gray-800 font-bold tracking-wider">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs xs:text-sm text-gray-600 font-mono">LAP</span>
            </div>
          </div>
        </div>

        <motion.div className="flex flex-wrap gap-4 w-full md:w-auto justify-center md:justify-end">
          <Button
            onClick={handleEditLeagueName}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-white/80 to-white/30 border-2 border-[var(--primary-red)] shadow-lg text-gray-800 text-xl font-bold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_24px_rgba(217,4,41,0.25)] hover:bg-gradient-to-br hover:from-[var(--primary-red)]/80 hover:to-[var(--primary-red)]/40 hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <RiEdit2Fill className="text-2xl" />
              Edit Name
            </span>
          </Button>

          <Button
            onClick={handleAddMembers}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-white/80 to-white/30 border-2 border-[var(--primary-red)] shadow-lg text-gray-800 text-xl font-bold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_24px_rgba(217,4,41,0.25)] hover:bg-gradient-to-br hover:from-[var(--primary-red)]/80 hover:to-[var(--primary-red)]/40 hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <TiUserAdd className="text-2xl" />
              Add Members
            </span>
          </Button>

          <Button
            onClick={handleLeaveLeague}
            className="group relative flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-br from-white/80 to-white/30 border-2 border-[var(--primary-red)] shadow-lg text-gray-800 text-xl font-bold transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_24px_rgba(217,4,41,0.25)] hover:bg-gradient-to-br hover:from-[var(--primary-red)]/80 hover:to-[var(--primary-red)]/40 hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <GiExitDoor className="text-2xl" />
              Exit League
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;
