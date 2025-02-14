"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { createUser } from "@/lib/firestore/user/write";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface LoginData {
  email: string;
  password: string;
}

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoginData>({ email: "", password: "" });

  const handleData = (key: keyof LoginData, value: string) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const doneLogin = await signInWithEmailAndPassword(auth, data.email, data.password);
      if(doneLogin){
        console.log('logged in ')
        toast.success("Logged In Successfully");
        router.replace(`/`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        // console.log("no")
        toast.error(error.message);
      } else {
        // console.log("no")
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     router.push("/");
  //   }
  // }, [user, router]);

  return (
    <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
      <section className="flex flex-col gap-3">
        <div className="flex justify-center">
          <Image className="h-12 w-12" src="/logo.png" alt="Logo" height={48} width={48} />
        </div>
        <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
          <h1 className="font-bold text-xl">Login With Email</h1>
          <form
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleLogin();
            }}
            className="flex flex-col gap-3"
          >
            <input
              placeholder="Enter Your Email"
              type="email"
              name="user-email"
              id="user-email"
              value={data.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleData("email", e.target.value)
              }
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <input
              placeholder="Enter Your Password"
              type="password"
              name="user-password"
              id="user-password"
              value={data.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleData("password", e.target.value)
              }
              className="px-3 py-2 rounded-xl border focus:outline-none w-full"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="flex justify-between">
            <Link href={`/sign-up`} className="font-semibold text-sm text-blue-700">
              New? Create Account
            </Link>
            <Link href={`/forget-password`} className="font-semibold text-sm text-blue-700">
              Forget Password?
            </Link>
          </div>
          <hr />
          <SignInWithGoogleComponent />
        </div>
      </section>
    </main>
  );
}

function SignInWithGoogleComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = credential.user;
      if (user) {
        await createUser({
          uid: user.uid,
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
        });
        toast.success("Logged in with Google");
      }
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
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 hover:bg-red-600 disabled:bg-gray-400 w-full"
    >
      {isLoading ? "Signing in..." : "Sign In With Google"}
    </button>
  );
}
