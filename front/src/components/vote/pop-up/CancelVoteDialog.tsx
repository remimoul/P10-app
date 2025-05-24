import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CancelVoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const CancelVoteDialog = ({
  open,
  onOpenChange,
  onConfirm,
}: CancelVoteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl p-0 overflow-visible">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 relative"
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-0 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-[var(--primary-red)] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-red)]/40"
            aria-label="Fermer la pop-up"
            type="button"
          >
            <IoClose size={36} />
          </button>
          <DialogHeader className="text-center">
            <DialogTitle className="text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-red)] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
              Annuler le vote
            </DialogTitle>
          </DialogHeader>
          <div className="mt-8 space-y-6">
            <p className="text-2xl font-medium text-gray-600 text-center">
              Êtes-vous sûr de vouloir annuler votre vote ?<br />
              <span className="text-red-500 font-semibold">
                Cette action est irréversible.
              </span>
            </p>
            <div className="flex justify-center gap-6 pt-4">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="px-8 py-6 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-xl transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                Non, garder mon vote
              </Button>
              <Button
                type="button"
                onClick={onConfirm}
                className="px-8 py-6 bg-gradient-to-r from-[var(--primary-red)] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                Oui, annuler mon vote
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
