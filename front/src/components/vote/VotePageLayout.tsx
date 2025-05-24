import { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RiInformationLine } from "react-icons/ri";

interface VotePageLayoutProps {
  children: ReactNode;
  voteModified?: boolean;
}

const VotePageLayout = ({ children, voteModified }: VotePageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="p-6 mb-8">{children}</div>
      </div>

      {voteModified && (
        <Alert className="mb-4">
          <RiInformationLine className="h-4 w-4" />
          <AlertTitle>Temps de vote écoulé</AlertTitle>
          <AlertDescription>
            Le temps de vote est écoulé. Les résultats seront disponibles après
            la course.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default VotePageLayout;
