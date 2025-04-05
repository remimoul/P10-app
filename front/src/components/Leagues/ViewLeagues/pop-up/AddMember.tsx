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
import { AddMemberProps } from "@/types";

import { Button } from "@/components/ui/button";

const AddMember = ({ isOpen, onClose, onSendInvitation }: AddMemberProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    try {
      onSendInvitation(email);
      toast.success("Invitation sent!");
      setEmail("");
      onClose();
    } catch {
      toast.error("An error occurred while sending the invitation.");
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
              Add a Member
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div className="space-y-3">
              <label className="block text-xl font-medium text-gray-700">
                Member Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full p-3 bg-white text-gray-900 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="flex justify-center gap-4 pt-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="px-6 py-6 border-2 border-gray-300 text-gray-700 hover:border-gray-400 rounded-xl text-lg shadow-sm"
                >
                  Cancel
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="px-6 py-6 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg shadow-sm"
                >
                  Send Invitation
                </Button>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
