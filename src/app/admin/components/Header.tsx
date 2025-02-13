"use client";

import { useAuth } from "@/context/AuthContext";
import { useAdmin } from "@/lib/firestore/admins/read";
import { Avatar } from "@nextui-org/react";
import { Menu } from "lucide-react";
import { JSX } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps): JSX.Element {
  const { user } = useAuth();
  const { data: admin } = useAdmin({ email: user?.email });

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3">
      {/* Mobile Sidebar Toggle */}
      <div className="flex justify-center items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      {/* Header Content */}
      <div className="w-full flex justify-between items-center pr-0 md:pr-[260px]">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-2 items-center">
          {/* Admin Info (Hidden on Mobile) */}
          <div className="md:flex flex-col items-end hidden">
            <h1 className="text-sm font-semibold">{admin?.name || "Admin"}</h1>
            <h1 className="text-xs text-gray-600">{admin?.email || user?.email}</h1>
          </div>
          
          {/* Profile Avatar */}
          <Avatar 
            size="sm" 
            src={admin?.imageURL || "/default-avatar.png"} 
            alt="Admin Avatar" 
          />
        </div>
      </div>
    </section>
  );
}
