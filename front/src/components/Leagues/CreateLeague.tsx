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

export const CreateLeague = ({
  isOpen,
  onClose,
  onCreate,
}: CreateLeagueProps) => {
  const [leagueName, setLeagueName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!leagueName.trim()) {
      toast.error("League name is required");
      return;
    }

    try {
      onCreate({ name: leagueName, isPrivate });
    } catch (error) {
      toast.error("Validation errors");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl shadow-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
              Create a League
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-3">
              <label className="block text-xl font-medium text-gray-700">
                League Name
              </label>
              <input
                type="text"
                required
                className="w-full p-3 bg-white text-gray-900 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={leagueName}
                onChange={(e) => setLeagueName(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <span className="block text-xl font-medium text-gray-700">
                League Type
              </span>
              <div className="flex gap-6 justify-center">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={!isPrivate}
                    onChange={() => setIsPrivate(false)}
                    className="h-5 w-5 text-red-600 border-2 border-gray-300 checked:border-red-600 focus:ring-red-500"
                  />
                  <span className="font-medium text-gray-700 text-lg">
                    Public
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={isPrivate}
                    onChange={() => setIsPrivate(true)}
                    className="h-5 w-5 text-blue-600 border-2 border-gray-300 checked:border-blue-600 focus:ring-blue-500"
                  />
                  <span className="font-medium text-gray-700 text-lg">
                    Private
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl text-lg shadow-sm"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg shadow-sm"
                >
                  Confirm
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
