import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DialogContentProps } from "@/lib/types/leagues";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IoClose } from "react-icons/io5";

const BUTTON_STYLES = {
  cancel:
    "px-8 py-6 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-xl transition-colors duration-200 shadow-sm hover:shadow-md",
  confirm:
    "px-8 py-6 bg-gradient-to-r from-[var(--primary-red)] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden",
};

const DIALOG_STYLES = {
  content:
    "sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl",
  title:
    "text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-red)] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider",
  message: "text-2xl font-medium text-gray-600 text-center",
};

const DialogContentExitLeague = ({
  onClose,
  onConfirmExit,
}: DialogContentProps) => {
  const router = useRouter();

  const handleConfirmExit = () => {
    onConfirmExit();
    toast.success("You have exited the league.");
    router.push("/leagues");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 relative"
    >
      <button
        onClick={onClose}
        className="absolute top-0 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-[var(--primary-red)] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-red)]/40"
        aria-label="Close dialog"
        type="button"
      >
        <IoClose size={36} />
      </button>
      <DialogHeader className="text-center">
        <DialogTitle className={DIALOG_STYLES.title}>Exit League</DialogTitle>
      </DialogHeader>

      <div className="mt-8 space-y-6">
        <p className={DIALOG_STYLES.message}>
          Are you sure you want to exit the league ?
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center gap-6 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className={BUTTON_STYLES.cancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirmExit}
            className={BUTTON_STYLES.confirm}
          >
            Confirm Exit
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DialogContentExitLeague;
