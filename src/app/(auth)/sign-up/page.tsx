/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<SignUpData>({ name: "", email: "", password: "" });

  const handleData = (key: keyof SignUpData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSignUp = async () => {
    if (!data.name || !data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(credential.user, { displayName: data.name });

      await createUser({
        uid: credential.user.uid,
        displayName: data.name,
        photoURL: credential.user.photoURL || "",
      });

      toast.success("Successfully Signed Up");
      // router.push("/account");
      router.push(`/`);
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
          <Image className="h-12" src="/logo.png" alt="Logo" height={48} width={48} />
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Sign Up With Email</h1>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSignUp();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Name"
              type="text"
              name="user-name"
              id="user-name"
              value={data.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleData("name", e.target.value)}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={data.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleData("email", e.target.value)}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              value={data.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleData("password", e.target.value)}
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <div className="flex justify-between">
            <Link href={`/login`} className="font-semibold text-sm text-blue-700">
              Already a user? Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
