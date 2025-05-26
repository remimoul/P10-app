"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiTeamFill, RiArrowRightSLine } from "react-icons/ri";
import { LeagueCardProps } from "@/lib/types/leagues";

const LeagueCard = ({ league, index, isPublic }: LeagueCardProps) => {
  const buttonGradient = isPublic
    ? "from-[#FF1801] to-[#CC0000]"
    : "from-[#00D2FF] to-[#0050B3]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative overflow-hidden bg-gradient-to-br from-[#1c1e22] to-[#2a2f36] rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-700 shadow-lg mx-6 sm:mx-10 md:mx-16"
    >
      <div className="relative z-10 flex flex-col items-center justify-between gap-4 sm:gap-6 md:items-center md:gap-8 md:flex-col">
        <div className="flex items-center gap-4 sm:gap-6 flex-1">
          <div className="relative">
            <div
              className={`w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center rounded-full 
                bg-gradient-to-br ${
                  isPublic
                    ? "from-red-900/80 to-red-700"
                    : "from-blue-900/80 to-blue-700"
                }
                `}
            >
              <span className="text-3xl font-semibold text-white bg-clip-text bg-gradient-to-b from-white to-gray-300">
                {league.position}
              </span>
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-white/20 shadow-[0_0_12px_2px_rgba(255,255,255,0.25)] pointer-events-none" />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white uppercase tracking-wider">
              {league.name}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-xl sm:text-lg">
              <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                <RiTeamFill
                  className={`text-lg ${
                    isPublic ? "text-red-400" : "text-blue-400"
                  } drop-shadow-[0_0_4px_rgba(255,24,1,0.3)]`}
                />
                <span className="whitespace-nowrap">
                  {league.members} member(s)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 relative z-10">
          <div className="text-center">
            <div className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {league.points}
            </div>
            <div className="text-lg uppercase text-gray-400 tracking-widest">
              Points
            </div>
          </div>
          <div className="md:w-px md:h-8 w-full h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent my-2 md:my-0" />

          <motion.div
            whileHover={{
              scale: 1.05,
              translateX: 10,
              rotate: isPublic ? 1.5 : -1.5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
            }}
          >
            <Button
              onClick={league.onClick}
              className={`relative px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white rounded-full shadow-2xl 
                bg-gradient-to-r ${buttonGradient} 
                hover:shadow-[0_0_30px_-5px] ${
                  isPublic
                    ? "hover:shadow-red-500/50"
                    : "hover:shadow-blue-400/60"
                }
                transition-all duration-300 overflow-hidden
                border-2 ${
                  isPublic
                    ? "border-red-300/30 hover:border-red-300/60"
                    : "border-blue-300/30 hover:border-blue-300/60"
                }
                ${!isPublic ? "ring-1 ring-blue-400/30" : ""}
                w-full`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0"
                initial={{ x: "-100%" }}
                whileHover={{
                  opacity: 1,
                  x: "200%",
                  transition: { duration: 0.6 },
                }}
              />

              <span className="relative flex items-center">
                {isPublic ? "Join the race" : "View ranking"}
                <RiArrowRightSLine className="ml-2 inline-block text-lg sm:text-xl" />
              </span>

              {isPublic && (
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    transition: { staggerChildren: 0.1 },
                  }}
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      initial={{
                        x: -10,
                        y: Math.random() * 20 - 10,
                        scale: 0,
                      }}
                      whileHover={{
                        x: 120,
                        y: Math.random() * 40 - 20,
                        scale: [1, 1.5, 0],
                        opacity: [1, 0.5, 0],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {isPublic ? (
        <div className="absolute -right-20 -top-20 w-40 sm:w-48 h-40 sm:h-48 bg-red-900 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
      ) : (
        <div className="absolute -left-20 -bottom-20 w-40 sm:w-48 h-40 sm:h-48 bg-blue-900 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
      )}

      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0" />

      <div className="block md:hidden pb-4" />
    </motion.div>
  );
};

export default LeagueCard;
