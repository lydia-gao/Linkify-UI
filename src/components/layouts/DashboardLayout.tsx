"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link as LinkIcon,
  List,
  Folder,
  Search,
  Bell,
  ChevronDown,
  Calendar,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  breadcrumb?: string;
  showDateRange?: boolean;
}

export default function DashboardLayout({
  children,
  pageTitle,
  breadcrumb,
  showDateRange = false,
}: DashboardLayoutProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const pathname = usePathname();

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="bg-[#f1f1ee] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col">
        <div className="p-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="Linkify Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </div>

        <div className="flex justify-center mb-6">
          <Link
            href="/links/new"
            className="w-44 px-4 py-2 bg-black text-white text-xs rounded-md hover:bg-gray-800"
          >
            + CREATE NEW
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-2">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/dashboard")
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/links"
            className={`flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/links")
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            All Links
          </Link>
          <Link
            href="/click-list"
            className={`flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium rounded-md ${
              isActive("/click-list")
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <List className="w-4 h-4" />
            Click List
          </Link>

          {/* Categories Dropdown */}
          <div className="w-44 mx-auto">
            <button
              onClick={toggleCategories}
              className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                Categories
              </span>
              <span>⌄</span>
            </button>
            <div
              className={`ml-2 mt-3 space-y-3 ${
                isCategoriesOpen ? "block" : "hidden"
              }`}
            >
              <Link
                href="#"
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>Links</span>
                <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                  21
                </span>
              </Link>
              <Link
                href="#"
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>QR Codes</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                  32
                </span>
              </Link>
              <Link
                href="#"
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>Barcodes</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                  13
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-[#f1f1ee]">
        {/* Top Header */}
        <header className="h-16 bg-white border-b flex items-center justify-end px-6 gap-6">
          <Search className="w-5 h-5 text-gray-600" />
          <Bell className="w-5 h-5 text-gray-600" />
          <button className="px-3 py-1 border rounded-md text-sm text-gray-700 bg-white">
            ADMIN ⌄
          </button>
        </header>

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
        <main className="p-6 space-y-6 bg-[#f1f1ee]">{children}</main>

        {/* Footer */}
        <footer className="p-6 text-sm text-gray-500 flex justify-between bg-[#f1f1ee]">
          <p>© 2023 - Linkify Dashboard</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Careers
            </a>
            <a href="#" className="hover:underline">
              Policy
            </a>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
