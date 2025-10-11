"use client";
import { Search, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <header className="h-16 bg-[#fafaf8] border-b border-gray-200 flex items-center justify-end px-6 gap-6">
      <Search className="w-5 h-5 text-gray-600" />
      <Bell className="w-5 h-5 text-gray-600" />
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-gray-200 bg-[#fafaf8]"
        >
          ADMIN ⌄
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 border-gray-200 bg-[#fafaf8] text-red-600 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" /> Logout
        </Button>
      </div>
    </header>
  );
}
