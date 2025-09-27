"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6 gap-6">
      <Button variant="ghost" size="icon">
        <Search className="w-5 h-5 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon">
        <Bell className="w-5 h-5 text-gray-600" />
      </Button>
      <Button variant="outline" className="text-sm">
        ADMIN <ChevronDown className="w-3 h-3 ml-1" />
      </Button>
    </header>
  );
}
