"use client";

import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const { user } = useAuth();

  if (!user) return null; // Return null instead of an empty fragment

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to log out?")) return;
    try {
      await toast.promise(signOut(auth), {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: (error: { message: string }) => error?.message || "Logout failed",
      });
    } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred.");
        }
      }
  };

  return (
    <button
      onClick={handleLogout}
      className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-50"
      aria-label="Log out"
    >
      <LogOut size={14} />
    </button>
  );
}
