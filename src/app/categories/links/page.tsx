"use client";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/api/axios";

export default function CategoryLinksPage() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 15;
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const pagedItems = useMemo(
    () => items.slice((page - 1) * pageSize, page * pageSize),
    [items, page]
  );
  useEffect(() => {
    axios.get("/shorturls/").then((res) => setItems(res.data || []));
  }, []);
  return (
    <RequireAuth>
      <Layout>
        <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-800">Category: Links</h2>
            <p className="text-sm text-gray-500">
              Home &gt; Categories &gt; Links
            </p>
          </div>
        </section>
        <main className="p-6 space-y-6 bg-[#f1f1ee] min-h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pagedItems.map((item) => (
              <Card
                key={item.id}
                className="bg-[#fafaf8] border border-gray-200 rounded-md"
              >
                <CardContent className="p-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-1">
                        {item.original_url}
                      </p>
                      <p className="text-xs font-semibold text-gray-800 mb-2">
                        {item.short_url}
                      </p>
                      <p className="mt-2 text-xs text-gray-500 whitespace-pre-line">
                        {item.description || item.summary}
                      </p>
                    </div>
                    {/* Links 页面不显示图片 */}
                  </div>
                  <div className="flex justify-between items-start mt-4">
                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                      <span>Clicks</span>
                      <span>Expiration</span>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-gray-700 text-right">
                      <span>{item.clicks}</span>
                      <span>{item.expiration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Pagination */}
          {items.length > 0 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex space-x-2 text-sm">
                <button
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-default"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  PREV
                </button>
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  const isActive = pageNumber === page;
                  return (
                    <button
                      key={pageNumber}
                      className={
                        "px-3 py-1 rounded border " +
                        (isActive
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-800 hover:bg-gray-100")
                      }
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  className="px-3 py-1 bg-white border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-default"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  NEXT
                </button>
              </nav>
            </div>
          )}
        </main>
      </Layout>
    </RequireAuth>
  );
}
