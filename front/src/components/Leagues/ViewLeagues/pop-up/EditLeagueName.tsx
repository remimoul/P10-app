"use client";

import { useState } from "react";
import { EditLeagueNameProps } from "@/lib/types";
import toast from "react-hot-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DialogContentEditLeagueName from "@/components/Leagues/ViewLeagues/pop-up/DialogContentEditLeagueName";

const DIALOG_STYLES = {
  content:
    "sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl",
};

const EditLeagueName = ({ isOpen, onClose, onSave }: EditLeagueNameProps) => {
  const [leagueName, setLeagueName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leagueName.trim()) {
      toast.error("League name is required");
      return;
    }
    try {
      onSave(leagueName);
      toast.success("League name updated successfully!");
      setLeagueName("");
      onClose();
    } catch {
      toast.error("An error occurred while updating the league name.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={DIALOG_STYLES.content}>
        <DialogContentEditLeagueName
          leagueName={leagueName}
          onLeagueNameChange={setLeagueName}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditLeagueName;
