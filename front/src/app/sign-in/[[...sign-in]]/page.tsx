import { SignIn } from "@clerk/nextjs";

const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn />
    </div>
  );
};

export default LogIn;
