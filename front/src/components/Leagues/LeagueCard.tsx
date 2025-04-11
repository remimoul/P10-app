"use client";

import { motion } from "framer-motion";
import type { LeagueCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { RiTeamFill, RiArrowRightSLine } from "react-icons/ri";

export const LeagueCard = ({ league, index, isPublic }: LeagueCardProps) => {
  const buttonGradient = isPublic
    ? "from-[#FF1801] to-[#CC0000]"
    : "from-[#00D2FF] to-[#0078FF]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="relative overflow-hidden bg-gradient-to-br from-[#1c1e22] to-[#2a2f36] rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-700 shadow-lg transition-all duration-300 group"
    >
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        style={{
          background:
            "linear-gradient(45deg, rgba(217,4,41,0.5), rgba(42,52,57,0.5))",
          maskImage: "linear-gradient(#fff 0 0)",
        }}
      />

      <motion.div
        className="absolute top-0 left-[-100%] w-full h-full pointer-events-none"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
        style={{ background: "rgba(255,255,255,0.05)" }}
      />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-6 flex-1">
          <div className="relative">
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full 
                bg-gradient-to-br ${
                  isPublic
                    ? "from-red-900/80 to-red-700"
                    : "from-blue-900/80 to-blue-700"
                }
                shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]`}
            >
              <span
                className={`text-xl sm:text-2xl font-bold ${
                  isPublic ? "text-red-300" : "text-blue-300"
                }
                bg-clip-text bg-gradient-to-b from-white to-gray-300`}
              >
                {league.position}
              </span>
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-white/10 pointer-events-none" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-wider font-racing">
              {league.name}
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-2 text-base sm:text-lg">
              <div className="flex items-center gap-1 sm:gap-2 text-gray-300">
                <RiTeamFill
                  className={`text-lg sm:text-xl ${
                    isPublic ? "text-red-400" : "text-blue-400"
                  } drop-shadow-[0_0_4px_rgba(255,24,1,0.3)]`}
                />
                <span>{league.members} member(s)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 relative z-10">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {league.points}
            </div>
            <div className="text-lg sm:text-lg uppercase text-gray-400 tracking-widest">
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
                    : "hover:shadow-blue-500/50"
                }
                transition-all duration-300 overflow-hidden
                border-2 ${
                  isPublic
                    ? "border-red-300/30 hover:border-red-300/60"
                    : "border-blue-300/30 hover:border-blue-300/60"
                }`}
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

              <motion.span
                className="relative flex items-center"
                whileHover={{ gap: "8px" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isPublic ? "Join the race" : "View the ranking"}
                <motion.div
                  whileHover={{
                    x: 5,
                    rotate: isPublic ? 360 : -360,
                    scale: 1.2,
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <RiArrowRightSLine className="ml-2 inline-block text-lg sm:text-xl" />
                </motion.div>
              </motion.span>

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
    </motion.div>
  );
};
