import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Form Builder - Sign up',
};

function SignUpPage() {
  return (
    <div
      className="flex items-center justify-center h-screen">
      <SignUp />
    </div>
  );
}

export default SignUpPage;