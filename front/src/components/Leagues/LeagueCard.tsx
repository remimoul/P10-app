"use client";

import { motion } from "framer-motion";
import type { LeagueCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { RiTeamFill, RiArrowRightSLine } from "react-icons/ri";

export const LeagueCard = ({ league, index, isPublic }: LeagueCardProps) => {
  const buttonGradient = isPublic
    ? "from-red-500 to-red-600"
    : "from-blue-500 to-blue-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.15 }}
      className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-red-200 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 flex-1">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isPublic ? "bg-red-100" : "bg-blue-100"
            }`}
          >
            <span
              className={`text-2xl font-bold ${
                isPublic ? "text-red-600" : "text-blue-600"
              }`}
            >
              {league.position}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 uppercase tracking-tight">
              {league.name}
            </h3>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <RiTeamFill
                  className={isPublic ? "text-red-500" : "text-blue-500"}
                />
                <span>{league.members} member(s)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {league.points}
            </div>
            <div className="text-sm uppercase text-gray-500 tracking-wide">
              Points
            </div>
          </div>
          <div className="md:w-px md:h-10 w-full h-px bg-gray-800 my-4 md:my-0" />
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <Button
              className={`px-4 py-2 text-lg font-bold text-white rounded-full transition-transform transform hover:scale-105 shadow-xl bg-gradient-to-r ${buttonGradient}`}
            >
              Join <RiArrowRightSLine className="ml-2 inline-block" />
            </Button>
          </motion.div>
        </div>
      </div>

      {isPublic && (
        <div className="absolute -right-20 -top-20 w-48 h-48 bg-red-100 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity" />
      )}
    </motion.div>
  );
};
