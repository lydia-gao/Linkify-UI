"use client";

import {
  LayoutDashboard,
  Link as LinkIcon,
  List,
  Folder,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [showCategories, setShowCategories] = useState(false);
  const pathname = usePathname();

  const navItem = (href: string, label: string, icon: React.ReactNode) => {
    const active = pathname === href;
    return (
      <NextLink
        href={href}
        className={
          "flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium rounded-md " +
          (active
            ? "bg-indigo-600 text-white"
            : "text-gray-700 hover:bg-gray-100")
        }
      >
        {icon}
        {label}
      </NextLink>
    );
  };

  return (
    <aside className="w-56 bg-[#fafaf8] border-r border-gray-200 flex flex-col">
      <div className="p-6 flex justify-center">
        <Image src="/logo.png" alt="Linkify Logo" width={120} height={32} />
      </div>

      <div className="flex justify-center mb-6">
        <NextLink href="/new" className="w-44">
          <Button className="w-full text-xs bg-black text-white hover:bg-gray-900">
            + CREATE NEW
          </Button>
        </NextLink>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        {navItem(
          "/dashboard",
          "Dashboard",
          <LayoutDashboard className="w-4 h-4" />
        )}
        {navItem("/analysis", "Analysis", <LayoutDashboard className="w-4 h-4" />)}
        {navItem("/links", "All Links", <LinkIcon className="w-4 h-4" />)}
        {navItem("/test", "Click List", <List className="w-4 h-4" />)}

        <div className="w-44 mx-auto">
          <button
            onClick={() => setShowCategories(!showCategories)}
            aria-expanded={showCategories}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <span className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Categories
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showCategories ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {showCategories && (
            <div className="ml-2 mt-3 space-y-3">
              <NextLink
                href="/links"
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>Links</span>
                <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                  21
                </span>
              </NextLink>
              <NextLink
                href="/links"
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>QR Codes</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                  32
                </span>
              </NextLink>
              <NextLink
                href="/links"
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>Barcodes</span>
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded">
                  13
                </span>
              </NextLink>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
