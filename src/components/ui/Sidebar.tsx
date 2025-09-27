"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleCategories, setCategoriesOpen } from "@/store/slices/uiSlice";
import {
  LayoutDashboard,
  Link as LinkIcon,
  List,
  Folder,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { categoriesOpen } = useSelector((state: RootState) => state.ui);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
    },
    {
      name: "All Links",
      href: "/links",
      icon: LinkIcon,
      active: pathname === "/links",
    },
    {
      name: "Click List",
      href: "/click-list",
      icon: List,
      active: pathname === "/click-list",
    },
  ];

  const categories = [
    { name: "Links", count: 21, href: "/links?category=links" },
    { name: "QR Codes", count: 32, href: "/links?category=qr-codes" },
    { name: "Barcodes", count: 13, href: "/links?category=barcodes" },
  ];

  const handleCategoriesToggle = () => {
    dispatch(toggleCategories());
  };

  return (
    <aside className="w-56 bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="p-6 flex justify-center">
        <Link href="/dashboard">
          <Image
            src="/logo.png"
            alt="Linkify Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        </Link>
      </div>

      {/* Create New Button */}
      <div className="flex justify-center mb-6">
        <Button asChild className="w-44 text-xs">
          <Link href="/links/new">+ CREATE NEW</Link>
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                item.active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}

        {/* Categories Dropdown */}
        <div className="w-44 mx-auto">
          <Button
            variant="ghost"
            onClick={handleCategoriesToggle}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <span className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Categories
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                categoriesOpen ? "rotate-180" : ""
              }`}
            />
          </Button>

          <div
            className={`ml-2 mt-3 space-y-3 ${
              categoriesOpen ? "block" : "hidden"
            }`}
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex justify-between items-center px-2 py-1 text-sm text-gray-600 hover:underline rounded-md"
              >
                <span>{category.name}</span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    category.name === "Links"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
