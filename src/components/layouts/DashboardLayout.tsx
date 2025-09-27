"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Sidebar } from "@/components/ui/Sidebar";
import { Topbar } from "@/components/ui/Topbar";
import { Footer } from "@/components/ui/Footer";
import { Calendar, ChevronDown } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumb?: string;
  showDateRange?: boolean;
}

export function DashboardLayout({
  children,
  pageTitle,
  breadcrumb,
  showDateRange = false,
}: DashboardLayoutProps) {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  return (
    <div className="bg-[#f1f1ee] min-h-screen flex">
      {/* Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f1f1ee]">
        {/* Top Header */}
        <Topbar />

        {/* Page Title Area */}
        <section className="bg-[#f1f1ee] border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-800">{pageTitle}</h2>
            {breadcrumb && (
              <p className="text-sm text-gray-500">{breadcrumb}</p>
            )}
          </div>
          {showDateRange && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              Feb 16,2022 - Feb 20,2022
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </section>

        {/* Main Content */}
        <main className="p-6 space-y-6 bg-[#f1f1ee] flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
