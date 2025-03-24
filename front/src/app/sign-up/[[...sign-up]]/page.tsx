import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
