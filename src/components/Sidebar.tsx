"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  LayoutDashboard,
  Link2,
  User,
  Settings,
  LogOut,
  Plus,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "All Links", href: "/links", icon: Link2 },
  { name: "My Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

const categories = [
  { name: "All", count: 120 },
  { name: "Active", count: 85 },
  { name: "Inactive", count: 35 },
];

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn("flex h-full w-64 flex-col bg-white border-r", className)}
    >
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b">
        <h1 className="text-2xl font-bold text-gray-900">LINKIFY</h1>
      </div>

      {/* Create New Button */}
      <div className="p-6">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Categories */}
        <div className="mt-8">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Categories
          </h3>
          <ul className="mt-2 space-y-1">
            {categories.map((category) => (
              <li key={category.name}>
                <button
                  className={cn(
                    "flex items-center justify-between w-full px-3 py-2 text-sm rounded-lg transition-colors",
                    "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-gray-500">
                    ({category.count})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t p-4">
        <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
