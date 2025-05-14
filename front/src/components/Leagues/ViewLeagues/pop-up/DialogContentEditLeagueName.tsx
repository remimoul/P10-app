"use client";

import { Button } from "@/components/ui/button";
import { DialogContentEditLeagueNameProps } from "@/lib/types";
import { IoClose } from "react-icons/io5";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const DialogContentEditLeagueName = ({
  leagueName,
  onLeagueNameChange,
  onSubmit,
  onClose,
}: DialogContentEditLeagueNameProps) => {
  return (
    <div className="p-6">
      <DialogHeader className="flex flex-row items-center justify-between mb-6">
        <DialogTitle className="text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
          Edit League Name
        </DialogTitle>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close dialog"
        >
          <IoClose size={24} />
        </button>
      </DialogHeader>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="leagueName"
            className="block text-2xl font-medium text-gray-600 mb-2"
          >
            New League Name
          </label>
          <input
            type="text"
            id="leagueName"
            value={leagueName}
            onChange={(e) => onLeagueNameChange(e.target.value)}
            className="w-full p-4 bg-white/90 text-gray-800 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm text-xl"
            placeholder="Enter new league name"
            aria-label="New league name"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 py-2"
          >
            Cancel
          </Button>
          <Button type="submit" className="px-6 py-2">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DialogContentEditLeagueName; 