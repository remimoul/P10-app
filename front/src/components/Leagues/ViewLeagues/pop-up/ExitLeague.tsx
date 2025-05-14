"use client";

import { ExitLeagueProps } from "@/lib/types/leagues";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DialogContentExitLeague from "@/components/Leagues/ViewLeagues/pop-up/DialogContentExitLeague";

const DIALOG_STYLES = {
  content:
    "sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl",
  title:
    "text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider",
  message: "text-2xl font-medium text-gray-600 text-center",
};

const ExitLeague = ({ isOpen, onClose, onConfirmExit }: ExitLeagueProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={DIALOG_STYLES.content}>
        <DialogContentExitLeague
          onClose={onClose}
          onConfirmExit={onConfirmExit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ExitLeague;
