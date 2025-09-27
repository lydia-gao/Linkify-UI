"use client";

import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewLinkPage() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Layout>
      {/* Page title area */}
      <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800">Create New Link</h2>
          <p className="text-sm text-gray-500">
            Home &gt; All Links &gt; Create New
          </p>
        </div>
      </section>

      <main className="p-6 bg-[#f1f1ee]">
        <Card className="bg-[#fafaf8] border border-gray-200 rounded-md p-0">
          <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
            {/* Left form */}
            <div className="lg:col-span-2 space-y-6 text-sm">
              <div>
                <label className="block font-bold text-gray-700">URL</label>
                <Input
                  type="url"
                  placeholder="https://example.com/your-link"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700">
                  Link Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter link name"
                  className="mt-2"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter description"
                  className="w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-2"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700">
                  Category
                </label>
                <Input type="text" placeholder="Category" className="mt-2" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700">
                    Owner Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Owner name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700">
                    Expiration (days)
                  </label>
                  <Input type="number" placeholder="0" className="mt-2" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700">Alias</label>
                <Input type="text" placeholder="Alias" className="mt-2" />
              </div>
              <div>
                <label className="block font-bold text-gray-700">Tags</label>
                <div className="mt-2 w-full border rounded-md px-3 py-2 flex flex-wrap gap-2">
                  {"e-commerce,Shoes,sales,Industrial".split(",").map((tag) => (
                    <span
                      key={tag}
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
              <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">[ Link Preview Image ]</span>
                )}
              </div>
              <label className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-gray-500 cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const url = URL.createObjectURL(file);
                    setPreview(url);
                  }}
                />
                Drop your image here, or browse
                <br />
                <span className="text-xs">Jpeg, png are allowed</span>
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                  <span>Link-thumbnail.png</span>
                  <span className="text-indigo-600 text-xs font-medium">
                    OK
                  </span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                  <span>Link-thumbnail.png</span>
                  <span className="text-indigo-600 text-xs font-medium">
                    OK
                  </span>
                </div>
              </div>
            </div>

            {/* Actions bottom */}
            <div className="lg:col-span-3 flex justify-end gap-3 pt-2">
              <Button className="px-4 py-2 bg-black text-white text-sm rounded-md">
                CREATE
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2 text-sm rounded-md"
              >
                CANCEL
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
}
