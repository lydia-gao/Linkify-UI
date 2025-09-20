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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Link Details
              </h1>
              <p className="text-gray-600">
                Create a new link or edit existing one.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Link Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label
                            htmlFor="linkName"
                            className="block text-sm font-medium text-gray-700 mb-2"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 mb-2"
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
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="url"
                            className="block text-sm font-medium text-gray-700 mb-2"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="category"
                              className="block text-sm font-medium text-gray-700 mb-2"
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                              className="block text-sm font-medium text-gray-700 mb-2"
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                              Status
                            </label>
                            <div className="flex items-center space-x-3">
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
                              className="block text-sm font-medium text-gray-700 mb-2"
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
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="shadow-sm border-0 bg-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      Link Gallery
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Upload images for your link
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
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

                    {/* Sample existing images */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-700">
                        Existing Images:
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="relative group">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                              <img
                                src="/horizontal_link.png"
                                alt="Link"
                                className="w-8 h-8 opacity-50"
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

            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-6 py-2 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="outline"
                className="px-6 py-2 border-red-300 text-red-600 hover:bg-red-50"
              >
                Delete
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </Button>
            </div>
          </div>

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
