"use client";

import { useState } from "react";
import { AddMemberProps } from "@/lib/types/leagues";
import toast from "react-hot-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AddMemberContent from "@/components/Leagues/ViewLeagues/pop-up/DialogContentAddMember";

const DIALOG_STYLES = {
  content:
    "sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl",
  title:
    "text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider",
  label: "block text-2xl font-medium text-gray-600",
  input:
    "w-full p-4 bg-white/90 text-gray-800 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm text-xl",
};

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
      <DialogContent className={DIALOG_STYLES.content}>
        <AddMemberContent
          email={email}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddMember;
