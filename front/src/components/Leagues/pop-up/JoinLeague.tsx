"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { JoinLeagueProps } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const JoinLeague = ({ isOpen, onClose, onJoin }: JoinLeagueProps) => {
  const [joinCode, setJoinCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!joinCode.trim()) {
      toast.error("Join code is required");
      return;
    }

    try {
      onJoin(joinCode);
    } catch {
      toast.error("Error during joining");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-red)] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
              Join a League
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <label className="block text-2xl font-medium text-gray-600">
                League Join Code
              </label>
              <input
                type="text"
                required
                className="w-full p-4 bg-white/90 text-gray-800 border text-xl border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter the league code"
              />
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-8 py-6 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-xl transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-8 py-6 bg-gradient-to-r from-[var(--primary-red)] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                Join
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
