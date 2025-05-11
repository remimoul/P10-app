import { motion } from "framer-motion";
import { TiUserAdd } from "react-icons/ti";
import { GiExitDoor } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import { RiTimerLine, RiLockFill, RiEarthFill } from "react-icons/ri";

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
    className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-gray-50 to-white p-8 shadow-2xl border border-gray-100"
  >
    <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,_rgba(255,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30" />
    <div className="absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 blur-2xl" />
    <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-20 blur-2xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-red-50 to-transparent rounded-full opacity-10 blur-3xl" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_transparent_30%,_rgba(255,0,0,0.02)_30%,_rgba(255,0,0,0.02)_40%,_transparent_40%,_transparent_50%,_rgba(255,0,0,0.02)_50%,_rgba(255,0,0,0.02)_60%,_transparent_60%)] opacity-20" />
    <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_48%,_rgba(255,0,0,0.05)_48%,_rgba(255,0,0,0.05)_52%,_transparent_52%)] opacity-10" />
    <div className="absolute inset-0 bg-[linear-gradient(-45deg,_transparent_48%,_rgba(255,0,0,0.05)_48%,_rgba(255,0,0,0.05)_52%,_transparent_52%)] opacity-10" />

    <div className="relative z-10 flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex flex-col gap-3 max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight relative"
          >
            {league.name}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 group"
          >
            <LeagueTypeIcon type={league.type} />
            <span className="text-xl font-medium text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
              {league.type === "public" ? "Public League" : "Private League"}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/20" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_48%,_rgba(255,255,255,0.1)_48%,_rgba(255,255,255,0.1)_52%,_transparent_52%)] opacity-20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_transparent_70%)] opacity-20" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4px_4px] opacity-20" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="relative">
              <RiTimerLine className="text-2xl text-red-500" />
              <div className="absolute -inset-1 bg-red-500/10 blur-sm rounded-full opacity-20" />
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-xl font-mono font-bold text-gray-900 tracking-tighter">
                {timeLeft > 0 ? (
                  <>
                    <span className="text-red-500">
                      {formatTime(timeLeft).split(":")[0]}
                    </span>

                    <span className="text-red-500">
                      {formatTime(timeLeft).split(":")[1]}
                    </span>

                    <span className="text-red-500">
                      {formatTime(timeLeft).split(":")[2]}
                    </span>
                  </>
                ) : (
                  <span className="text-red-500">FINISHED</span>
                )}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-medium text-gray-500 flex items-center gap-2"
        >
          Season 2024 • Round 12 • Circuit de Monaco
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={handleAddMembers}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-red-500 via-red-600 to-red-900 text-white px-6 py-6 rounded-full shadow-xl hover:shadow-2xl hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_0%,_rgba(255,255,255,0.1)_50%,_transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-1000" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.2),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,255,255,0.3),_transparent_30%)] opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-red-300/50 transition-all duration-500" />
            <span className="relative z-10 flex items-center gap-2 text-xl font-bold">
              <TiUserAdd className="text-xl group-hover:scale-110 transition-transform duration-300" />
              Add Member(s)
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
    </div>
  </motion.div>
);

export default Header;
