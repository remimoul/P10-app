"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { GiCheckeredFlag } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";

import { Button } from "@/components/ui/button";
import { JoinLeague } from "@/components/Leagues/pop-up/JoinLeague";
import { CreateLeague } from "@/components/Leagues/pop-up/CreateLeague";

export const ReadyToRace = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleCreateLeague = async (league: {
    name: string;
    isPrivate: boolean;
  }) => {
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

  const handleJoinLeague = async (joinCode: string) => {
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
    <div>
      <motion.div
        className="mt-20 bg-gradient-to-r from-red-50 to-blue-50 backdrop-blur-lg p-8 rounded-3xl border-2 border-red-100 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="space-y-4 flex-1">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Race ?
            </h2>
            <p className="text-gray-600">
              Start your engines and join the ultimate racing challenge !
            </p>
          </div>

          <div className="flex gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                className="h-16 px-8 text-lg bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl flex items-center gap-3 group shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <GiCheckeredFlag className="text-2xl group-hover:rotate-12 transition-transform" />
                <span className="relative z-10">Create League</span>

                <div className="absolute right-0 h-full w-2 bg-gradient-to-t from-white/30 to-transparent opacity-80 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                variant="outline"
                onClick={() => setIsJoinModalOpen(true)}
                className="h-16 px-8 border-2 text-lg border-gray-300 hover:border-transparent bg-gradient-to-r from-blue-50/50 to-blue-100/20 hover:bg-gradient-to-br hover:from-blue-100 hover:to-indigo-100 text-gray-900 rounded-xl flex items-center gap-3 shadow-lg group relative overflow-hidden"
              >
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-500/30 group-hover:animate-pulse-short" />
                <span className="bg-gradient-to-r text-xl from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:animate-text-shimmer">
                  Join League
                </span>
                <RiArrowRightSLine className="text-xl text-blue-600 group-hover:translate-x-1 group-hover:scale-125 transition-transform duration-300" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30" />
      </motion.div>

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
