import { MessageCircleQuestion } from "lucide-react";

const FAQHeader = () => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <MessageCircleQuestion className="w-20 h-20 text-[var(--primary-red)]" />
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-red-900 to-red-600 bg-clip-text text-transparent mb-4">
        Frequently Asked Questions
      </h1>
      <p className="text-gray-600 text-xl">
        Find answers to common questions about P10
      </p>
    </div>
  );
};

export default FAQHeader;
