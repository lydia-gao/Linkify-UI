"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "../../../components/Sidebar";
import { Navbar } from "../../../components/Navbar";
import { FormInput } from "../../../components/FormInput";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Upload, X } from "lucide-react";

const categoryOptions = [
  { value: "Google", label: "Google" },
  { value: "Social", label: "Social" },
  { value: "Email", label: "Email" },
  { value: "Direct", label: "Direct" },
  { value: "Ad SEO", label: "Ad SEO" },
  { value: "Affiliate", label: "Affiliate" },
];

export default function CreateLinkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    linkName: "",
    description: "",
    url: "",
    category: "",
    ownerName: "",
    status: true,
    expirationDays: "",
    tags: [] as string[],
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/links");
  };

  const handleCancel = () => {
    router.push("/links");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Link Details
              </h1>
              <p className="text-gray-500">
                Create a new link or edit existing one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 左侧表单区 */}
              <div className="md:col-span-2">
                <Card className="shadow border bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900">
                      Link Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 gap-5">
                        <div>
                          <label
                            htmlFor="linkName"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Link Name *
                          </label>
                          <input
                            id="linkName"
                            type="text"
                            placeholder="Enter link name"
                            value={formData.linkName}
                            onChange={(e) =>
                              handleInputChange("linkName", e.target.value)
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            placeholder="Enter link description"
                            value={formData.description}
                            onChange={(e) =>
                              handleInputChange("description", e.target.value)
                            }
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="url"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            URL *
                          </label>
                          <input
                            id="url"
                            type="url"
                            placeholder="https://example.com"
                            value={formData.url}
                            onChange={(e) =>
                              handleInputChange("url", e.target.value)
                            }
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="category"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Category *
                            </label>
                            <select
                              id="category"
                              value={formData.category}
                              onChange={(e) =>
                                handleInputChange("category", e.target.value)
                              }
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select category</option>
                              {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label
                              htmlFor="ownerName"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Owner Name *
                            </label>
                            <input
                              id="ownerName"
                              type="text"
                              placeholder="Enter owner name"
                              value={formData.ownerName}
                              onChange={(e) =>
                                handleInputChange("ownerName", e.target.value)
                              }
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="status"
                                checked={formData.status}
                                onChange={(e) =>
                                  handleInputChange("status", e.target.checked)
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <label
                                htmlFor="status"
                                className="text-sm text-gray-700"
                              >
                                {formData.status ? "Active" : "Inactive"}
                              </label>
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="expirationDays"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Expiration (Days)
                            </label>
                            <input
                              id="expirationDays"
                              type="number"
                              placeholder="365"
                              value={formData.expirationDays}
                              onChange={(e) =>
                                handleInputChange(
                                  "expirationDays",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              {/* 右侧图片区 */}
              <div className="flex flex-col gap-6">
                <Card className="shadow border bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold text-gray-900">
                      Link Gallery
                    </CardTitle>
                    <p className="text-xs text-gray-500">
                      Upload images for your link
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 mb-1">
                        Drag & drop your image here or click to upload
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 hover:bg-gray-50"
                      >
                        Choose File
                      </Button>
                    </div>
                    {/* 图片列表 */}
                    <div className="mt-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">
                        Existing Images:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src="/horizontal_link.png"
                                alt="Link"
                                className="w-16 h-16 object-contain opacity-80"
                              />
                            </div>
                            <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* 按钮区 */}
            <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-5 py-2 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                className="px-5 py-2 border-red-300 text-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>
          <footer className="bg-white border-t px-4 py-4 mt-8">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>© 2023 Linkify. All rights reserved.</div>
              <div className="flex items-center gap-3">
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
