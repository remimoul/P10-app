import { motion } from "framer-motion";
import { UserCardProps } from "@/lib/types/leagues";
import { Button } from "@/components/ui/button";
import { GiCheckeredFlag } from "react-icons/gi";
import { IoArrowForward } from "react-icons/io5";
import UserAvatar from "@/components/Leagues/ViewLeagues/UserAvatar";

const UserCard = ({
  participant,
  timeLeft,
  rank,
  handleVote,
}: UserCardProps) => {
  const safeParticipant = participant ?? {
    id: "default",
    name: "Racer",
    score: 0,
    hasVoted: false,
    avatar: "",
    isButton: true,
  };

  return (
    <motion.div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg overflow-hidden mb-6 sm:mb-8 md:mb-10 mx-4 sm:mx-6 md:mx-8 lg:mx-12">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 w-full sm:w-auto">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-red-500/40 via-transparent to-red-500/40 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent rounded-full"
            />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center border-2 border-red-500/30">
              <UserAvatar
                avatarUrl={safeParticipant.avatar}
                fullName={safeParticipant.name}
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2"
              >
                <GiCheckeredFlag className="text-xl sm:text-2xl md:text-3xl text-red-500" />
              </motion.div>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-4">
              <div className="text-center">
                <p className="text-3xl sm:text-xl md:text-4xl font-semibold text-black">
                  {safeParticipant.score}
                </p>
                <p className="text-lg sm:text-xl text-red-500 uppercase tracking-wider">
                  Points
                </p>
              </div>
              <div className="h-8 sm:h-12 w-px bg-red-500/30" />
              <div className="text-center">
                <p className="text-3xl sm:text-xl md:text-4xl font-semibold text-black">
                  #{rank ? rank : "N/A"}
                </p>
                <p className="text-lg sm:text-xl text-red-500 uppercase tracking-wider">
                  Position
                </p>
              </div>
            </div>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative w-full sm:w-auto mt-4 sm:mt-0"
        >
          <Button
            onClick={handleVote}
            disabled={timeLeft === 0}
            className={`
              w-full sm:w-auto px-6 sm:px-7 py-4 sm:py-3 text-lg sm:text-xl md:text-2xl rounded-full font-bold relative overflow-hidden
              bg-white border-2 border-[#D90429] text-[#D90429] shadow-md
              transition-all duration-200
              before:absolute before:inset-0 before:rounded-full before:bg-[radial-gradient(circle_at_60%_40%,rgba(217,4,41,0.18)_0%,transparent_70%)] before:opacity-0 before:pointer-events-none before:transition-opacity before:duration-200
              hover:bg-gradient-to-br hover:from-[#D90429] hover:via-[#D90429]/80 hover:to-black hover:text-white hover:shadow-[0_4px_32px_rgba(217,4,41,0.25)] hover:border-[#D90429] hover:scale-105 hover:before:opacity-80
              active:scale-95
              disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-wider">
              {safeParticipant.hasVoted ? (
                <>
                  <span>CANCEL VOTE</span>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <GiCheckeredFlag className="text-2xl sm:text-2xl text-[#D90429]" />
                  </motion.div>
                </>
              ) : (
                <>
                  <span>VOTE</span>
                  <motion.div
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <IoArrowForward className="text-2xl sm:text-2xl text-[#D90429]" />
                  </motion.div>
                </>
              )}
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserCard;
