import { motion } from "framer-motion";
import { TiUserAdd } from "react-icons/ti";
import { GiExitDoor } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { RiTimerLine, RiLockFill, RiEarthFill } from "react-icons/ri";

const LeagueTypeIcon = ({ type }: { type: string }) => (
  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md">
    {type === "public" ? (
      <RiEarthFill className="text-2xl text-red-500" />
    ) : (
      <RiLockFill className="text-2xl text-red-500" />
    )}
  </div>
);

const Header = ({
  league,
  timeLeft,
  formatTime,
  handleAddMembers,
  handleLeaveLeague,
}: {
  league: { name: string; type: string };
  timeLeft: number;
  formatTime: (seconds: number) => string;
  handleAddMembers: () => void;
  handleLeaveLeague: () => void;
}) => (
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

      <div className="flex flex-col items-center gap-2 bg-white/80 px-6 py-4 rounded-xl border border-red-500/30">
        <div className="flex items-center gap-2">
          <RiTimerLine className="text-2xl text-red-500" />
          <span className="text-2xl font-bold text-black">
            {timeLeft > 0 ? formatTime(timeLeft) : "FINISHED"}
          </span>
        </div>
        <span className="text-sm opacity-80">Race Clock</span>
      </div>
    </div>

    <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-end">
      <Button
        onClick={handleAddMembers}
        className="
            group relative inline-flex items-center justify-center overflow-hidden rounded-xl 
            px-6 py-6 text-lg font-extrabold uppercase tracking-wider transition-all duration-500 ease-in-out
            bg-gradient-to-r from-red-500 via-red-600 to-black text-white shadow-2xl hover:scale-105 hover:shadow-3xl
            focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2
          "
      >
        <span className="relative z-10 flex items-center">
          <TiUserAdd className="mr-3 text-2xl" />
          Add Member(s)
        </span>
        <span className="absolute inset-0 rounded-xl bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-20"></span>
        <span className="absolute inset-0 rounded-xl border border-transparent bg-gradient-to-br from-red-500 to-black opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"></span>
      </Button>
      <Button
        onClick={handleLeaveLeague}
        className="
            group relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-6 text-lg font-bold uppercase tracking-wider transition-transform duration-500 ease-out
            bg-white text-red-500 border border-red-300 shadow-md hover:scale-105 hover:bg-red-50 hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
          "
      >
        <span className="relative z-10 flex items-center">
          Exit League <GiExitDoor className="ml-2 text-2xl" />
        </span>
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-red-200 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40"></span>
      </Button>
    </div>

    <div className="mt-6 flex items-center gap-4">
      <span className="text-xl font-medium opacity-90">
        Season 2024 • Round 12 • Circuit de Monaco
      </span>
    </div>
  </motion.div>
);

export default Header;
