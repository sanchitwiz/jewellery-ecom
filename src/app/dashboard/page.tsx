"use client"

import Link from "next/link";

export default function Page() {
  return (
    <div className="p-10">
      <h1>Dashboard</h1>
      <Link href={'/admin'}> Admin Panel</Link>
    </div>
  );
}