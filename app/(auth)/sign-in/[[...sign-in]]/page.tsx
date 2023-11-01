import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Form Builder - Sign in',
};

function SignInPage() {
  return (
    <div
      className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
}

export default SignInPage;