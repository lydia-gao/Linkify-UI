"use client";

import { LayoutDashboard, Link, List, Folder } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <aside className="w-56 bg-white border-r flex flex-col">
      <div className="p-6 flex justify-center">
        <Image src="/logo.png" alt="Linkify Logo" width={120} height={32} />
      </div>

      <div className="flex justify-center mb-6">
        <Button className="w-44 text-xs">+ CREATE NEW</Button>
      </div>

      <nav className="flex-1 px-3 space-y-2">
        <a className="flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md">
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </a>
        <a className="flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <Link className="w-4 h-4" />
          All Links
        </a>
        <a className="flex items-center gap-2 w-44 mx-auto px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <List className="w-4 h-4" />
          Click List
        </a>

        <div className="w-44 mx-auto">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            <span className="flex items-center gap-2">
              <Folder className="w-4 h-4" />
              Categories
            </span>
            <span>⌄</span>
          </button>
          {showCategories && (
            <div className="ml-6 mt-1 space-y-1">
              <a href="#" className="block text-sm text-gray-600 hover:underline">
                Category 1
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:underline">
                Category 2
              </a>
              <a href="#" className="block text-sm text-gray-600 hover:underline">
                Category 3
              </a>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
