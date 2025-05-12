"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { GiTrophyCup } from "react-icons/gi";
import { RiTeamFill, RiArrowRightSLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { JoinLeague } from "@/components/Leagues/pop-up/JoinLeague";
import { CreateLeague } from "@/components/Leagues/pop-up/CreateLeague";

const ReadyToRace = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCreateLeague = async () => {
    // const handleCreateLeague = async (league: {
    //   name: string;
    //   isPrivate: boolean;
    // }) => {
    const toastId = toast.loading("Creation of the league ...");
    try {
      // Simulation appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("League successfully created!", { id: toastId });
    } catch {
      toast.error("Error during creation", {
        id: toastId,
        duration: 5000,
      });
    }
  };

  const handleJoinLeague = async () => {
    // const handleJoinLeague = async (joinCode: string) => {
    const toastId = toast.loading("Joining the league ...");
    try {
      // Simulation appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Successfully joined the league!", { id: toastId });
    } catch {
      toast.error("Error during joining", {
        id: toastId,
        duration: 5000,
      });
    }
  };

  return (
    <div className="relative">
      <div className="mt-10 sm:mt-20 bg-gradient-to-br from-[#1c1e22] to-[#2a2f36] backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-3xl border border-gray-700 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between relative z-10">
          <div className="space-y-3 sm:space-y-4 flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-wider font-racing whitespace-nowrap">
              Ready to Race ?
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl max-w-md mx-auto md:mx-0">
              Start your engines and join the ultimate racing challenge !
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-full sm:w-auto"
            >
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-bold text-white rounded-full shadow-2xl 
                  bg-gradient-to-r from-[#FF1801] to-[#CC0000] 
                  hover:shadow-[0_0_30px_-5px] hover:shadow-red-500/50
                  transition-all duration-300 overflow-hidden
                  border-2 border-red-300/30 hover:border-red-300/60
                  group relative"
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
                  className="relative flex items-center justify-center gap-2"
                  whileHover={{ gap: "8px" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GiTrophyCup className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform" />
                  Create League
                  <RiArrowRightSLine className="ml-2 inline-block text-lg sm:text-xl" />
                </motion.span>

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
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-full sm:w-auto"
            >
              <Button
                variant="outline"
                onClick={() => setIsJoinModalOpen(true)}
                className="w-full sm:w-auto h-14 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-bold text-white rounded-full shadow-2xl 
                  bg-gradient-to-r from-[#00D2FF] to-[#0078FF] 
                  hover:shadow-[0_0_30px_-5px] hover:shadow-blue-500/50
                  transition-all duration-300 overflow-hidden
                  border-2 border-blue-300/30 hover:border-blue-300/60
                  group relative"
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
                  className="relative flex items-center justify-center gap-2"
                  whileHover={{ gap: "8px" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <RiTeamFill className="text-xl sm:text-2xl group-hover:translate-x-1 transition-transform" />
                  Join League
                  <RiArrowRightSLine className="ml-2 inline-block text-lg sm:text-xl" />
                </motion.span>

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
                      className="absolute w-1 h-1 bg-white rounded-full"
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
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute -top-20 -right-20 w-40 sm:w-64 h-40 sm:h-64 bg-red-900 rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-40 sm:w-64 h-40 sm:h-64 bg-blue-900 rounded-full blur-3xl opacity-20" />
      </div>

      <CreateLeague
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateLeague}
      />

      <JoinLeague
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinLeague}
      />
    </div>
  );
};

export default ReadyToRace;
