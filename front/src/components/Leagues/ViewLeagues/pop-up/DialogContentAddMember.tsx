import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AddMemberContentProps } from "@/lib/types";

const DIALOG_STYLES = {
  content:
    "sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl",
  title:
    "text-4xl font-extrabold bg-gradient-to-r from-[#D90429] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider",
  label: "block text-2xl font-medium text-gray-600",
  input:
    "w-full p-4 bg-white/90 text-gray-800 border border-gray-200 rounded-full focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all duration-300 placeholder-gray-400 shadow-sm text-xl",
};

const BUTTON_STYLES = {
  cancel:
    "px-8 py-6 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-xl transition-colors duration-200 shadow-sm hover:shadow-md",
  confirm:
    "px-8 py-6 bg-gradient-to-r from-[#D90429] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden",
};

const AddMemberContent = ({
  email,
  onEmailChange,
  onSubmit,
  onClose,
}: AddMemberContentProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8"
    >
      <DialogHeader className="text-center">
        <DialogTitle className={DIALOG_STYLES.title}>Add a Member</DialogTitle>
      </DialogHeader>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <label className={DIALOG_STYLES.label}>Member Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter email"
            className={DIALOG_STYLES.input}
          />
        </div>
        <div className="flex justify-center gap-6 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className={BUTTON_STYLES.cancel}
          >
            Cancel
          </Button>
          <Button type="submit" className={BUTTON_STYLES.confirm}>
            Send Invitation
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddMemberContent;
