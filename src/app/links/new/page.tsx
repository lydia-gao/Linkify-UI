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
          <div className="container mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Link Details
                </h1>
                <p className="text-gray-600 mt-1">
                  Create a new link or edit existing one.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Link Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <FormInput
                        label="Link Name"
                        placeholder="Enter link name"
                        value={formData.linkName}
                        onChange={(value) =>
                          handleInputChange("linkName", value as string)
                        }
                        required
                      />

                      <FormInput
                        label="Description"
                        type="textarea"
                        placeholder="Enter link description"
                        value={formData.description}
                        onChange={(value) =>
                          handleInputChange("description", value as string)
                        }
                      />

                      <FormInput
                        label="URL"
                        placeholder="Enter the URL"
                        value={formData.url}
                        onChange={(value) =>
                          handleInputChange("url", value as string)
                        }
                        required
                      />

                      <FormInput
                        label="Category"
                        type="select"
                        placeholder="Select category"
                        value={formData.category}
                        onChange={(value) =>
                          handleInputChange("category", value as string)
                        }
                        options={categoryOptions}
                        required
                      />

                      <FormInput
                        label="Owner Name"
                        placeholder="Enter owner name"
                        value={formData.ownerName}
                        onChange={(value) =>
                          handleInputChange("ownerName", value as string)
                        }
                        required
                      />

                      <FormInput
                        label="Status"
                        type="switch"
                        value={formData.status}
                        onChange={(value) =>
                          handleInputChange("status", value as boolean)
                        }
                      />

                      <FormInput
                        label="Expiration (Days)"
                        placeholder="Enter expiration days"
                        value={formData.expirationDays}
                        onChange={(value) =>
                          handleInputChange("expirationDays", value as string)
                        }
                      />
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Link Gallery</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        Drag & drop your image here or click to upload
                      </p>
                      <Button variant="outline" size="sm">
                        Choose File
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="px-6 bg-red-600 hover:bg-red-700 text-white"
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
