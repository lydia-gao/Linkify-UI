"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { createLink } from "@/store/slices/linksSlice";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { FormField } from "@/components/ui/FormField";
import { TagInput } from "@/components/ui/TagInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewLinkPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.links);

  const [formData, setFormData] = useState({
    title: "",
    originalUrl: "",
    description: "",
    category: "links",
    alias: "",
    expiration: "",
    tags: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createLink(formData)).unwrap();
      router.push("/links");
    } catch (error) {
      console.error("Failed to create link:", error);
    }
  };

  const categories = [
    { value: "links", label: "Link" },
    { value: "qr-codes", label: "QR Code" },
    { value: "barcodes", label: "Barcode" },
  ];

  return (
    <DashboardLayout
      pageTitle="Create New Link"
      breadcrumb="Home > Links > New"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Link Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <FormField
                  label="Title"
                  name="title"
                  placeholder="Enter link title"
                  required
                  value={formData.title}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, title: value }))
                  }
                />

                <FormField
                  label="Original URL"
                  name="originalUrl"
                  type="url"
                  placeholder="https://example.com"
                  required
                  value={formData.originalUrl}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, originalUrl: value }))
                  }
                />

                <div className="space-y-2">
                  <label className="block font-bold text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Enter link description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-bold text-gray-700">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <FormField
                  label="Custom Alias (Optional)"
                  name="alias"
                  placeholder="my-custom-link"
                  value={formData.alias}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, alias: value }))
                  }
                />

                <FormField
                  label="Expiration Date (Optional)"
                  name="expiration"
                  type="date"
                  value={formData.expiration}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, expiration: value }))
                  }
                />

                <div className="space-y-2">
                  <label className="block font-bold text-gray-700">Tags</label>
                  <TagInput
                    tags={formData.tags}
                    onTagsChange={(tags) =>
                      setFormData((prev) => ({ ...prev, tags }))
                    }
                    placeholder="Add tags to categorize your link"
                    maxTags={5}
                  />
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Link"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
