import { motion } from "framer-motion";
import { TiUserAdd } from "react-icons/ti";
import { GiExitDoor } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import {
  RiTimerLine,
  RiLockFill,
  RiEarthFill,
  RiEdit2Fill,
} from "react-icons/ri";
import { HeaderProps } from "@/lib/types";

const LeagueTypeIcon = ({ type }: { type: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg border border-gray-100 group-hover:border-red-200 transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,0,0.1),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    {type === "public" ? (
      <RiEarthFill className="text-2xl text-red-500 group-hover:text-red-600 transition-colors duration-300 relative z-10" />
    ) : (
      <RiLockFill className="text-2xl text-red-500 group-hover:text-red-600 transition-colors duration-300 relative z-10" />
    )}
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
      className="mb-12"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="group relative">
            <LeagueTypeIcon type={league.type} />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
              {league.name}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <RiTimerLine className="text-xl text-gray-500" />
              <span className="text-lg text-gray-600">
                Time left: {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <motion.div className="flex flex-wrap gap-4">
          <Button
            onClick={handleEditLeagueName}
            className="group relative flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-6 rounded-full shadow-lg hover:shadow-xl hover:border-red-200 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_0%,_rgba(255,0,0,0.05)_50%,_transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-red-200/50 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-xl font-bold">
              <RiEdit2Fill className="text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              Edit Name
            </span>
          </Button>

          <Button
            onClick={handleAddMembers}
            className="group relative flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-6 rounded-full shadow-lg hover:shadow-xl hover:border-red-200 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_0%,_rgba(255,0,0,0.05)_50%,_transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-red-200/50 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-xl font-bold">
              <TiUserAdd className="text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              Add Members
            </span>
          </Button>

          <Button
            onClick={handleLeaveLeague}
            className="group relative flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-6 rounded-full shadow-lg hover:shadow-xl hover:border-red-200 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_0%,_rgba(255,0,0,0.05)_50%,_transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-red-200/50 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-xl font-bold">
              <GiExitDoor className="text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300" />
              Exit League
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;
