import { motion } from "framer-motion";
import { UserCardProps } from "@/lib/types";
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
  };

  return (
    <motion.div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg overflow-hidden mb-6 sm:mb-8 md:mb-10">
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
              w-full sm:w-auto px-5 sm:px-5 py-6 sm:py-4 text-lg sm:text-xl md:text-2xl
              ${
                timeLeft === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
                  : safeParticipant.hasVoted
                  ? "bg-white text-gray-900 border-2 border-gray-900 hover:border-red-500 hover:text-red-500"
                  : "relative group overflow-hidden text-2xl rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-red-700 text-white border-2 border-gray-600/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300"
              }
            `}
          >
            <span className="relative z-10 flex items-center justify-center gap-1 font-medium tracking-wider">
              {safeParticipant.hasVoted ? (
                <>
                  <span>CANCEL VOTE</span>
                  <GiCheckeredFlag className="text-2xl sm:text-2xl" />
                </>
              ) : (
                <>
                  <span>VOTE</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center"
                  >
                    <IoArrowForward className="text-2xl sm:text-2xl" />
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
