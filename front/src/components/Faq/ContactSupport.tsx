import { ArrowRight } from "lucide-react";

const ContactSupport = () => {
  return (
    <div className="text-center">
      <p className="text-gray-600 text-xl mb-4">
        If you couldn&apos;t find the answer to your question, feel free to
        contact our support team.
      </p>
      <a
        href="mailto:support@p10-app.com"
        className="inline-flex items-center text-lg text-red-600 hover:text-red-700 transition-colors"
      >
        Contact Support
        <ArrowRight className="ml-2 h-8 w-8" />
      </a>
    </div>
  );
};

export default ContactSupport;
