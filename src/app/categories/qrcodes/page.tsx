"use client";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "@/lib/api/axios";

export default function QRCodesPage() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    axios.get("/qrcodes/").then((res) => setItems(res.data || []));
  }, []);
  return (
    <RequireAuth>
      <Layout>
        <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-800">All QR Codes</h2>
            <p className="text-sm text-gray-500">Home &gt; QR Codes</p>
          </div>
        </section>
        <main className="p-6 space-y-6 bg-[#f1f1ee]">
          <div className="flex flex-col gap-6">
            {items.map((item) => (
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
                        {item.description}
                      </p>
                    </div>
                    {item.image_url && (
                      <Image
                        src={item.image_url}
                        alt="QR Code"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-start mt-4">
                    <div className="flex flex-col gap-2 text-xs text-gray-500">
                      <span>Expiration</span>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-gray-700 text-right">
                      <span>{item.expiration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </Layout>
    </RequireAuth>
  );
}
