/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleSendEmail = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Link has been sent to your email!");
    } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <Image className="h-12" src="/logo.png" alt="Logo" height={48} width={48}/>
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Forgot Password</h1>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSendEmail();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
          <div className="flex justify-between">
            <Link href="/login" className="font-semibold text-sm text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
