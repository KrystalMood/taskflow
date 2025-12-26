import { LoginForm } from "@/components/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - TaskFlow",
  description: "Sign in to your TaskFlow account.",
};

export default function LoginPage() {
  return (
    <main className="bg-brand-50 flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-brand-900 text-3xl font-bold">Welcome Back</h1>
          <p className="text-brand-600 mt-2">Sign in to continue to TaskFlow</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
