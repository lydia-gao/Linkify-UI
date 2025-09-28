"use client";

import Layout from "../../components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalysisPage() {
  return (
    <Layout>
      {/* Page title */}
      <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800">Analysis</h2>
          <p className="text-sm text-gray-500">Home &gt; Analysis</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          Feb 16,2022 - Feb 20,2022
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      <main className="p-6 space-y-6 bg-[#f1f1ee]">
        {/* Row: Graph + Best Links (moved from Dashboard) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-[#fafaf8] border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="font-bold text-gray-800">
                Activity Graph
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm" className="text-xs">
                    WEEKLY
                  </Button>
                  <Button size="sm" className="text-xs bg-black text-white">
                    MONTHLY
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs">
                    YEARLY
                  </Button>
                </div>
              </div>
              <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                [Graph Placeholder]
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#fafaf8] border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-gray-800">
                Best Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm mt-2 space-y-4">
                {[
                  {
                    name: "Link01",
                    amount: "$126.50",
                    last: "01-08-2022 14:32",
                  },
                  {
                    name: "QRCode02",
                    amount: "$126.50",
                    last: "01-07-2022 16:10",
                  },
                  {
                    name: "Barcode03",
                    amount: "$126.50",
                    last: "01-06-2022 11:25",
                  },
                ].map((b) => (
                  <li key={b.name}>
                    <div className="flex justify-between">
                      <span>{b.name}</span>
                      <span className="font-bold">{b.amount}</span>
                    </div>
                    <p className="text-xs text-gray-400">last click: {b.last}</p>
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full text-xs bg-black text-white">
                REPORT
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
