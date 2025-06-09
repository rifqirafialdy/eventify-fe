"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
