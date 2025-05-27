import { RiLoader2Fill } from "react-icons/ri";

const LoadingScreen = ({ message = "Loading..." }: { message?: string }) => (
  <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
    <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
    <p className="mt-4 text-xl font-medium text-black">{message}</p>
  </div>
);

export default LoadingScreen; 