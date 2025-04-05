"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ExitLeagueProps } from "@/types";
import { Button } from "@/components/ui/button";

const ExitLeague = ({ isOpen, onClose, onConfirmExit }: ExitLeagueProps) => {
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
              Exit League
            </DialogTitle>
          </DialogHeader>
          <p className="mt-4 text-lg text-gray-700 text-center">
            Are you sure you want to exit the league? This action cannot be
            undone.
          </p>
          <div className="flex justify-center gap-4 pt-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-6 py-6 border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl text-lg shadow-sm"
              >
                Cancel
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="button"
                onClick={() => {
                  onConfirmExit();
                  toast.success("You have exited the league.");
                }}
                className="px-6 py-6 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg shadow-sm"
              >
                Confirm Exit
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitLeague;
