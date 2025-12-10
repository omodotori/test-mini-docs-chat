"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center gap-6 p-4 bg-gray-800 text-white">
      <Link href="/documents" className="hover:text-gray-300">
        Документы
      </Link>
      <Link href="/chat" className="hover:text-gray-300">
        Чат
      </Link>
    </nav>
  );
}