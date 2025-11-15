"use client";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useMemo, useState } from "react";
import axios from "@/lib/api/axios";

type BaseItem = {
  id: number | string;
  title?: string;
  original_url?: string;
  short_url?: string;
  description?: string;
  summary?: string;
  clicks?: number;
  expiration?: string;
};

type CodeItem = BaseItem & {
  s3_key?: string;
};

export default function LinksPage() {
  const [linkItems, setLinkItems] = useState<BaseItem[]>([]);
  const [qrItems, setQrItems] = useState<CodeItem[]>([]);
  const [barcodeItems, setBarcodeItems] = useState<CodeItem[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    axios.get("/shorturls/").then((res) => setLinkItems(res.data || []));
    axios.get("/qrcodes/").then((res) => setQrItems(res.data || []));
    axios.get("/barcodes/").then((res) => setBarcodeItems(res.data || []));
  }, []);

  const allItems = useMemo(
    () => [
      ...linkItems.map((item) => ({ ...item, __type: "link" as const })),
      ...qrItems.map((item) => ({ ...item, __type: "qrcode" as const })),
      ...barcodeItems.map((item) => ({ ...item, __type: "barcode" as const })),
    ],
    [linkItems, qrItems, barcodeItems]
  );

  const totalPages = Math.max(1, Math.ceil(allItems.length / pageSize));

  const pagedItems = useMemo(
    () =>
      allItems.slice(
        (page - 1) * pageSize,
        Math.min(allItems.length, page * pageSize)
      ),
    [allItems, page]
  );

  return (
    <RequireAuth>
      <Layout>
        {/* Page title area */}
        <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-800">All Links &amp; Codes</h2>
            <p className="text-sm text-gray-500">Home &gt; All Links</p>
          </div>
        </section>

        {/* Content */}
        <main className="p-6 space-y-6 bg-[#f1f1ee] min-h-[calc(100vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pagedItems.map((item) => (
              <Card
                key={`${item.__type}-${item.id}`}
                className="bg-[#fafaf8] border border-gray-200 rounded-md"
              >
                <CardContent className="p-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-1.5">
                        {item.title || "Untitled"}
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
                    {"s3_key" in item && item.s3_key && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://linkify-images.s3.us-east-2.amazonaws.com/${item.s3_key}`}
                        alt={item.__type === "qrcode" ? "QR Code" : "Barcode"}
                        className="w-16 h-16 rounded-md object-cover self-start"
                      />
                    )}
                  </div>

                  <div className="flex justify-between items-start mt-4">
                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                      <span>{item.__type === "link" ? "Clicks" : "Scans"}</span>
                      <span>Expiration</span>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-gray-700 text-right">
                      <span>{item.clicks ?? "-"}</span>
                      <span>{item.expiration ?? "-"}</span>
                    </div>
                  </div>
                  <div className="mt-3 text-[11px] uppercase tracking-wide text-gray-400">
                    {item.__type === "link"
                      ? "Short Link"
                      : item.__type === "qrcode"
                      ? "QR Code"
                      : "Barcode"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {allItems.length > 0 && (
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
