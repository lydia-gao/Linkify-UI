"use client";

import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { createLink, resetResult } from "@/store/slices/linkSlice";
// import api from "@/lib/api/axios";

export default function NewLinkPage() {
  const dispatch = useDispatch<AppDispatch>();
  type LinkResult = { id: string | number; image_url?: string } | null;
  const { loading, error, result } = useSelector(
    (state: RootState) => state.link
  ) as {
    loading: boolean;
    error: string | null;
    result: LinkResult;
  };
  const [preview, setPreview] = useState<string | null>(null);
  const [codeType, setCodeType] = useState<"none" | "qrcode" | "barcode">(
    "none"
  );
  const [form, setForm] = useState({
    original_url: "",
    title: "",
    description: "",
    alias: "",
    owner: "",
    expiration: "",
    category: "",
    tags: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetResult());
    dispatch(
      createLink({
        codeType,
        original_url: form.original_url,
        title: form.title,
        description: form.description,
        alias: codeType === "none" ? form.alias : undefined,
      })
    );
  };

  useEffect(() => {
    // 创建成功后直接用 image_url 作为预览
    if (result && codeType !== "none" && result.image_url) {
      setPreview(result.image_url);
    }
    // 创建普通链接时清空预览
    if (result && codeType === "none") {
      setPreview(null);
    }
  }, [result, codeType]);

  return (
    <RequireAuth>
      <Layout>
        <main className="p-6 bg-[#f1f1ee]">
          <Card className="bg-[#fafaf8] border border-gray-200 rounded-md p-0">
            <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              <form
                className="lg:col-span-2 space-y-6 text-sm"
                onSubmit={handleSubmit}
              >
                {/* URL */}
                <div>
                  <label className="block font-bold text-gray-700">URL</label>
                  <Input
                    type="url"
                    name="original_url"
                    placeholder="https://example.com/your-link"
                    className="mt-2"
                    value={form.original_url}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Name */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Link Name
                  </label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Enter link name"
                    className="mt-2"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
                {/* Generate code */}
                <div>
                  <label className="block font-bold text-gray-700 mb-2">
                    Generate Code
                  </label>
                  <div className="inline-flex rounded-md border border-gray-300 overflow-hidden bg-white">
                    {[
                      { key: "none", label: "None" },
                      { key: "qrcode", label: "QR code" },
                      { key: "barcode", label: "Barcode" },
                    ].map((opt, idx) => {
                      const active = codeType === (opt.key as typeof codeType);
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            setCodeType(opt.key as typeof codeType)
                          }
                          className={
                            "px-3 py-1.5 text-sm focus:outline-none transition " +
                            (active
                              ? "bg-black text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100") +
                            (idx !== 2 ? " border-r border-gray-300" : "")
                          }
                          aria-pressed={active}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Choose whether to generate a QR code or a barcode for this
                    link.
                  </p>
                </div>
                {/* Alias */}
                <div>
                  <label className="block font-bold text-gray-700">Alias</label>
                  <Input
                    type="text"
                    name="alias"
                    placeholder="Alias"
                    className="mt-2"
                    value={form.alias}
                    onChange={handleChange}
                    disabled={codeType !== "none"}
                  />
                </div>
                {/* Owner / Expiration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700">
                      Owner Name
                    </label>
                    <Input
                      type="text"
                      name="owner"
                      placeholder="Owner name"
                      className="mt-2"
                      value={form.owner}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700">
                      Expiration (days)
                    </label>
                    <Input
                      type="number"
                      name="expiration"
                      placeholder="0"
                      className="mt-2"
                      value={form.expiration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Category */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Category
                  </label>
                  <Input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="mt-2"
                    value={form.category}
                    onChange={handleChange}
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="block font-bold text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    name="description"
                    placeholder="Enter description"
                    className="w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mt-2"
                    value={form.description}
                    onChange={handleChange}
                  />
                </div>
                {/* Tags */}
                <div>
                  <label className="block font-bold text-gray-700">Tags</label>
                  <Input
                    type="text"
                    name="tags"
                    placeholder="Comma separated tags"
                    className="mt-2"
                    value={form.tags}
                    onChange={handleChange}
                  />
                </div>
                {/* Feedback */}
                {loading && <div className="text-blue-600">Creating...</div>}
                {error && <div className="text-red-600">Error: {error}</div>}
                {result && (
                  <div className="text-green-600">
                    Created! ID:{" "}
                    {typeof result.id === "string" ||
                    typeof result.id === "number"
                      ? result.id
                      : JSON.stringify(result)}
                  </div>
                )}
                {/* Actions bottom */}
                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-sm rounded-md"
                    disabled={loading}
                  >
                    CREATE
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="px-4 py-2 text-sm rounded-md"
                    onClick={() =>
                      setForm({
                        original_url: "",
                        title: "",
                        description: "",
                        alias: "",
                        owner: "",
                        expiration: "",
                        category: "",
                        tags: "",
                      })
                    }
                  >
                    CANCEL
                  </Button>
                </div>
              </form>
              {/* Right panel */}
              <div className="space-y-6 text-sm">
                <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                  {preview && codeType === "none" ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={preview || undefined}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500">
                      [ Link Preview Image ]
                    </span>
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
                {/* Code preview area: QR/Barcode, controlled by segmented toggle */}
                {codeType !== "none" && (
                  <div className="w-full h-40 bg-white border border-dashed border-gray-300 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-gray-800 font-semibold mb-1">
                        {codeType === "qrcode" ? "QR Code" : "Barcode"} Preview
                      </div>
                      {preview && codeType !== "none" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={preview}
                          alt={codeType === "qrcode" ? "QR Code" : "Barcode"}
                          className="mx-auto max-h-32"
                        />
                      ) : (
                        <div className="text-xs text-gray-500">
                          Placeholder for generated {codeType}. This will update
                          after creation.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </Layout>
    </RequireAuth>
  );
}
