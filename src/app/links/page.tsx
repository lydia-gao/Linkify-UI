"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { LinkCard } from "../../components/LinkCard";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useAppSelector } from "../../store/hooks";
import { Link as LinkType } from "../../types";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function LinksPage() {
  const { links } = useAppSelector((state) => state.links);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Pagination logic
  const totalPages = Math.ceil(links.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLinks = links.slice(startIndex, endIndex);

  const handleViewLink = (link: LinkType) => {
    console.log("View link:", link);
    // TODO: Implement view functionality
  };

  const handleEditLink = (link: LinkType) => {
    console.log("Edit link:", link);
    // TODO: Navigate to edit page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    // Always show first page
    pages.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={`px-3 py-2 text-sm font-medium rounded-md ${
          currentPage === 1
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-50"
        }`}
      >
        1
      </button>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      pages.push(
        <span key="ellipsis1" className="px-3 py-2 text-sm text-gray-500">
          ...
        </span>
      );
    }

    // Show current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="px-3 py-2 text-sm text-gray-500">
          ...
        </span>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-2 text-sm font-medium rounded-md ${
            currentPage === totalPages
              ? "bg-blue-600 text-white"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Links</h1>
                <p className="text-gray-600 mt-1">
                  Manage and track all your links in one place.
                </p>
              </div>
              <Link href="/links/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New
                </Button>
              </Link>
            </div>

            {/* Links Grid */}
            <div className="space-y-4">
              {currentLinks.length > 0 ? (
                currentLinks.map((link) => (
                  <LinkCard
                    key={link.id}
                    link={link}
                    onView={handleViewLink}
                    onEdit={handleEditLink}
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="text-gray-500">
                      <p className="text-lg font-medium mb-2">No links found</p>
                      <p className="text-sm">
                        Get started by creating your first link.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {renderPagination()}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="bg-white border-t px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>© 2023 Linkify. All rights reserved.</div>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-gray-700">
                  Terms
                </a>
                <a href="#" className="hover:text-gray-700">
                  Privacy
                </a>
                <a href="#" className="hover:text-gray-700">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
