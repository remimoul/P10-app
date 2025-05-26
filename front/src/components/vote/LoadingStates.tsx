import {
  RiLoader2Fill,
  RiErrorWarningLine,
  RiInformationLine,
} from "react-icons/ri";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Loading..." }: LoadingProps) => (
  <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
    <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
    <p className="mt-4 text-xl font-medium text-black">{message}</p>
  </div>
);

interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => (
  <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center p-4">
    <Alert variant="destructive" className="max-w-md">
      <RiErrorWarningLine className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  </div>
);

export const NotAuthenticated = () => (
  <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center p-4">
    <Alert className="max-w-md">
      <RiInformationLine className="h-4 w-4" />
      <AlertTitle>Sign in required</AlertTitle>
      <AlertDescription>
        You must be signed in to participate in the vote.
      </AlertDescription>
    </Alert>
  </div>
);
