"use client";

import { Button } from "@/components/ui/button";
import { DialogContentEditLeagueNameProps } from "@/lib/types/leagues";
import { motion } from "framer-motion";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IoClose } from "react-icons/io5";

const DialogContentEditLeagueName = ({
  leagueName,
  onLeagueNameChange,
  onSubmit,
  onClose,
}: DialogContentEditLeagueNameProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 sm:p-8 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-0 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-[#D90429] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D90429]/40"
        aria-label="Close dialog"
        type="button"
      >
        <IoClose size={32} className="sm:size-9" />
      </button>
      <DialogHeader className="text-center">
        <DialogTitle className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
          Edit League Name
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-4">
          <label className="block text-lg sm:text-2xl font-medium text-gray-600">New League Name</label>
          <input
            type="text"
            value={leagueName}
            onChange={(e) => onLeagueNameChange(e.target.value)}
            placeholder="Enter new league name"
            className="w-full p-3 sm:p-4 bg-white/90 text-gray-800 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm text-base sm:text-xl"
            aria-label="New league name"
          />
        </div>
        <div className="flex justify-center gap-4 sm:gap-6 pt-2 sm:pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="px-5 py-3 sm:px-8 sm:py-6 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-base sm:text-xl transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-5 py-3 sm:px-8 sm:py-6 bg-gradient-to-r from-[#D90429] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-base sm:text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden">
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default DialogContentEditLeagueName; 