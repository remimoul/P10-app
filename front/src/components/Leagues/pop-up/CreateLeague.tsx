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
import { CreateLeagueProps } from "@/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const CreateLeague = ({ isOpen, onClose, onCreate }: CreateLeagueProps) => {
  const router = useRouter();
  const [leagueName, setLeagueName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leagueName.trim()) {
      toast.error("League name is required");
      return;
    }

    try {
      await onCreate({ name: leagueName, isPrivate });
      toast.success("League successfully created!");
      router.push("/leagues/viewLeague");
    } catch {
      toast.error("Validation errors");
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
            <DialogTitle className="text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
              Create a League
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <label className="block text-2xl font-medium text-gray-600">
                League Name
              </label>
              <input
                type="text"
                required
                className="w-full p-4 bg-white/90 text-gray-800 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm text-xl"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
                placeholder="Enter league name"
              />
            </div>

            <div className="space-y-4">
              <span className="block text-2xl font-medium text-gray-600">
                League Type
              </span>
              <div className="flex gap-8 justify-center">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={!isPrivate}
                    onChange={() => setIsPrivate(false)}
                    className="h-5 w-5 text-[#D90429] border-2 border-gray-300 checked:border-[#D90429] focus:ring-[#D90429]"
                  />
                  <span className="font-medium text-gray-700 text-xl">
                    Public
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(true)}
                    className="h-5 w-5 text-[#D90429] border-2 border-gray-300 checked:border-[#D90429] focus:ring-[#D90429]"
                  />
                  <span className="font-medium text-gray-700 text-xl">
                    Private
                  </span>
                </label>
              </div>
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
                className="px-8 py-6 bg-gradient-to-r from-[#D90429] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                Create
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
