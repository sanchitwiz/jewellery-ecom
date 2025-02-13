"use client";

import AuthContextProvider, { useAuth } from "@/context/AuthContext";
import { CircularProgress } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import AdminLayout from "./components/AdminLayout";

// Define props type for Layout component
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthContextProvider>
      <AdminChecking>{children}</AdminChecking>
    </AuthContextProvider>
  );
}

// Define props type for AdminChecking component
interface AdminCheckingProps {
  children: ReactNode;
}

function AdminChecking({ children }: AdminCheckingProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]); // Added router to dependencies array

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1>Please Login First!</h1>
      </div>
    );
  }

  return <AdminLayout>{children}</AdminLayout>;
}