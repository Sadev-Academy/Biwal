"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { registerUser } from "@/app/actions/register-user";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await registerUser(formData);

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
      } else {
        // Automatically sign in after registration
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <Section className="min-h-[80vh] flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold tracking-tighter mb-2">Create Account</h1>
            <p className="text-[#707072] text-sm">Join the Biwal community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-medium rounded">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#707072]" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border-transparent focus:bg-white focus:border-[#212121] outline-none transition-all text-sm"
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#707072]" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border-transparent focus:bg-white focus:border-[#212121] outline-none transition-all text-sm"
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-[#707072]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-[#F5F5F5] border-transparent focus:bg-white focus:border-[#212121] outline-none transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-2">
              <p className="text-[10px] text-[#707072] mb-6">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </p>
              <Button variant="primary" className="w-full py-4 text-xs tracking-widest uppercase font-bold" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-[#707072]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#212121] font-bold hover:underline underline-offset-4">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default RegisterPage;
