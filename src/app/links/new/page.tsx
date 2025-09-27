"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { CheckCircle } from "lucide-react";

export default function CreateLinkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    url: "",
    linkName: "",
    description: "",
    category: "",
    ownerName: "",
    expirationDays: "",
    alias: "",
    tags: ["e-commerce", "Shoes", "sales", "Industrial"],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock create link
    router.push("/links");
  };

  const handleCancel = () => {
    router.push("/links");
  };

  return (
    <DashboardLayout
      pageTitle="Create New Link"
      breadcrumb="Home > All Links > Create New"
    >
      <div className="bg-white shadow rounded-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Left form */}
        <div className="lg:col-span-2 space-y-6 text-sm">
          <div>
            <label className="block font-bold text-gray-700">URL</label>
            <input
              type="url"
              placeholder="https://example.com/your-link"
              value={formData.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Link Name</label>
            <input
              type="text"
              placeholder="Enter link name"
              value={formData.linkName}
              onChange={(e) => handleInputChange("linkName", e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Description</label>
            <textarea
              placeholder="Enter description"
              rows={3}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Category</label>
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                placeholder="Owner name"
                value={formData.ownerName}
                onChange={(e) => handleInputChange("ownerName", e.target.value)}
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700">
                Expiration (days)
              </label>
              <input
                type="number"
                placeholder="0"
                value={formData.expirationDays}
                onChange={(e) =>
                  handleInputChange("expirationDays", e.target.value)
                }
                className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700">Alias</label>
            <input
              type="text"
              placeholder="Alias"
              value={formData.alias}
              onChange={(e) => handleInputChange("alias", e.target.value)}
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Tags</label>
            <div className="mt-1 w-full border rounded-md px-3 py-2 flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-6 text-sm">
          <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center">
            <span className="text-gray-500">[ Link Preview Image ]</span>
          </div>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500">
            Drop your image here, or browse
            <br />
            <span className="text-xs">Jpeg, png are allowed</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
              <span>Link-thumbnail.png</span>
              <CheckCircle className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
              <span>Link-thumbnail.png</span>
              <CheckCircle className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Actions bottom */}
        <div className="lg:col-span-3 flex justify-end gap-3 pt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white text-sm rounded-md"
          >
            CREATE
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-md"
          >
            CANCEL
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
