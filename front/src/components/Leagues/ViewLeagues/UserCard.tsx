import { motion } from "framer-motion";
import { UserCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { GiCheckeredFlag } from "react-icons/gi";
import UserAvatar from "@/components/Leagues/ViewLeagues/UserAvatar";

const UserCard = ({
  participant,
  timeLeft,
  rank,
  handleVote,
  isButton = true,
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
    <motion.div className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg overflow-hidden mb-10">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 bg-gradient-to-r from-red-500 to-black rounded-full opacity-30"
            />
            <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center border-2 border-red-500/30">
              <UserAvatar
                avatarUrl={safeParticipant.avatar}
                fullName={safeParticipant.name}
              />
              <GiCheckeredFlag className="absolute -bottom-2 -right-2 text-3xl text-red-500" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-red-500">Your Stats</h2>
            <div className="flex gap-6 mt-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-black">
                  {safeParticipant.score}
                </p>
                <p className="text-sm text-red-500 uppercase tracking-wider">
                  Points
                </p>
              </div>
              <div className="h-12 w-px bg-red-500/30" />
              <div className="text-center">
                <p className="text-4xl font-bold text-black">
                  #{rank ? rank : "N/A"}
                </p>
                <p className="text-sm text-red-500 uppercase tracking-wider">
                  Position
                </p>
              </div>
            </div>
          </div>
        </div>
        {isButton && (
          <Button
            onClick={handleVote}
            disabled={timeLeft === 0}
            className={`
              relative inline-flex items-center justify-center overflow-hidden rounded-xl px-12 py-4 text-xl font-extrabold uppercase tracking-wider transition-transform duration-700 ease-out transform
              focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-offset-2
              ${
                timeLeft === 0
                  ? "bg-gray-300 text-red-600 cursor-not-allowed opacity-50"
                  : safeParticipant.hasVoted
                  ? "bg-white text-red-500 border border-red-500 shadow-inner hover:scale-105"
                  : "bg-gradient-to-br from-red-500 via-red-700 to-red-900 text-white shadow-2xl hover:scale-110 hover:shadow-3xl"
              }
            `}
          >
            <span className="relative z-20">
              {safeParticipant.hasVoted ? "Cancel Vote" : "Vote"}
            </span>
            <span className="absolute inset-0 rounded-full border border-transparent bg-gradient-to-r from-red-500 via-white to-red-500 opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-110"></span>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
