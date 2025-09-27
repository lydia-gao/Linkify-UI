import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="h-16 bg-[#fafaf8] border-b border-gray-200 flex items-center justify-end px-6 gap-6">
      <Search className="w-5 h-5 text-gray-600" />
      <Bell className="w-5 h-5 text-gray-600" />
      <Button
        variant="outline"
        size="sm"
        className="border-gray-200 bg-[#fafaf8]"
      >
        ADMIN ⌄
      </Button>
    </header>
  );
}
