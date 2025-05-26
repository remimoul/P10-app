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
      <DialogContent className="w-full max-w-xs sm:max-w-md md:max-w-xl bg-gray-50 rounded-2xl sm:rounded-3xl border border-gray-50 shadow-xl p-0 overflow-visible flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-10 relative"
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-0 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-[var(--primary-red)] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-red)]/40"
            aria-label="Close the pop-up"
            type="button"
          >
            <IoClose size={36} />
          </button>
          <DialogHeader className="w-full text-center flex flex-col items-center">
            <DialogTitle className="w-full text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-red)] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
              Cancel vote
            </DialogTitle>
          </DialogHeader>
          <div className="w-full mt-6 sm:mt-8 md:mt-10 space-y-4 sm:space-y-6 md:space-y-8 flex flex-col items-center">
            <p className="w-full text-base sm:text-2xl font-medium text-gray-600 text-center">
              Are you sure you want to cancel your vote?<br />
              <span className="text-red-500 font-semibold">
                This action cannot be undone.
              </span>
            </p>
            <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 pt-2 sm:pt-4 md:pt-6">
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                variant="outline"
                className="w-full sm:w-56 md:w-64 px-4 sm:px-8 md:px-10 py-3 sm:py-6 md:py-7 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-base sm:text-xl transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                No, keep my vote
              </Button>
              <Button
                type="button"
                onClick={onConfirm}
                className="w-full sm:w-56 md:w-64 px-4 sm:px-8 md:px-10 py-3 sm:py-6 md:py-7 bg-gradient-to-r from-[var(--primary-red)] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-base sm:text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
              >
                Yes, cancel my vote
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
