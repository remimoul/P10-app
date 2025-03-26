"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GiCheckeredFlag } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";

export const ReadyToRace = () => {
  return (
    <motion.div
      className="mt-20 bg-gradient-to-r from-red-50 to-blue-50 backdrop-blur-lg p-8 rounded-3xl border-2 border-red-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
        <div className="space-y-4 flex-1">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Race?</h2>
          <p className="text-gray-600">
            Start your engines and join the ultimate racing challenge!
          </p>
        </div>

        <div className="flex gap-6">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="h-16 px-8 text-lg bg-red-600 hover:bg-red-700 text-white rounded-xl flex items-center gap-3 group shadow-lg">
              <GiCheckeredFlag className="text-xl animate-pulse" />
              Create League
              <div className="h-full w-1 bg-white/20 ml-4 group-hover:w-2 transition-all" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="outline"
              className="h-16 px-8 border-2 text-lg border-gray-300 hover:border-blue-600 text-gray-900 hover:text-blue-800 rounded-xl flex items-center gap-3 shadow-lg"
            >
              Join Race
              <RiArrowRightSLine className="text-xl animate-bounce-horizontal" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
    </motion.div>
  );
};
