"use client";

import { useEffect, useRef, useState, ReactNode, JSX } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Button, CircularProgress } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth();
  const { data: admin, error, isLoading } = useAdmin({ email: user?.email });

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-red-500">{error}</h1>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <h1 className="font-bold">You are not an admin!</h1>
        <h1 className="text-gray-600 text-sm">{user?.email}</h1>
        <Button onClick={() => signOut(auth)}>Logout</Button>
      </div>
    );
  }

  return (
    <main className="relative flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:hidden transition-transform duration-300 z-50 
        ${isOpen ? "translate-x-0" : "-translate-x-[260px]"}`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <section className="pt-14 flex-1 bg-[#eff3f4]">{children}</section>
      </section>
    </main>
  );
}
