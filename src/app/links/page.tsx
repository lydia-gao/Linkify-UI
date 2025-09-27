"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import LinkCard from "@/components/LinkCard";

// Mock data for links
const mockLinks = [
  {
    title: "Example Website Homepage",
    originalUrl: "https://example.com/your/long/url",
    shortUrl: "https://{your-domain}/(alias-or-code)",
    description: "Good link in Google.",
    clicks: 1269,
    expiration: "2023-12-31",
  },
  {
    title: "Example Website Homepage",
    originalUrl: "https://example.com/your/long/url",
    shortUrl: "https://{your-domain}/(alias-or-code)",
    description: "Good link in Google.",
    clicks: 1269,
    expiration: "2023-12-31",
  },
  {
    title: "Example Website Homepage",
    originalUrl: "https://example.com/your/long/url",
    shortUrl: "https://{your-domain}/(alias-or-code)",
    description: "Good link in Google.",
    clicks: 1269,
    expiration: "2023-12-31",
  },
  {
    title: "Example Website Homepage",
    originalUrl: "https://example.com/your/long/url",
    shortUrl: "https://{your-domain}/(alias-or-code)",
    description: "Good link in Google.",
    clicks: 1269,
    expiration: "2023-12-31",
  },
];

export default function LinksPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(mockLinks.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <DashboardLayout pageTitle="All Links" breadcrumb="Home > All Products">
      <div className="flex flex-col gap-6">
        {/* Link Cards */}
        {mockLinks.map((link, index) => (
          <LinkCard
            key={index}
            title={link.title}
            originalUrl={link.originalUrl}
            shortUrl={link.shortUrl}
            description={link.description}
            clicks={link.clicks}
            expiration={link.expiration}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="inline-flex space-x-2 text-sm">
          <button
            className="px-3 py-1 bg-black text-white rounded"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          <button
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            onClick={() => handlePageChange(2)}
          >
            2
          </button>
          <button
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            onClick={() => handlePageChange(3)}
          >
            3
          </button>
          <button
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            onClick={() => handlePageChange(4)}
          >
            4
          </button>
          <span className="px-3 py-1">...</span>
          <button
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            onClick={() => handlePageChange(10)}
          >
            10
          </button>
          <button
            className="px-3 py-1 bg-white border rounded hover:bg-gray-100"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            NEXT
          </button>
        </nav>
      </div>
    </DashboardLayout>
  );
}
