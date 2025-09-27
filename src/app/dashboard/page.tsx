"use client";

import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  return (
    <Layout>
      {/* Page title */}
      <section className="bg-linkify-background border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Home &gt; Dashboard</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          Feb 16,2022 - Feb 20,2022
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      <main className="p-6 space-y-6 bg-linkify-background">
        {/* Row 1: Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Links", "QR codes", "Barcodes"].map((label, i) => (
            <Card
              key={i}
              className="rounded-lg border border-gray-200 shadow-sm bg-white"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center px-4 pb-4">
                <p className="text-3xl font-bold text-gray-900">102</p>
                <span className="text-green-600 text-sm font-medium">
                  ↑ 34.7%
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Row 2: Graph + Best Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Activity Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                [Graph Placeholder]
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold text-gray-800">
                Best Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm mt-2 space-y-4">
                <li className="flex justify-between">
                  <span>Link01</span>
                  <span className="font-bold">$126.50</span>
                </li>
                <li className="flex justify-between">
                  <span>QRCode02</span>
                  <span className="font-bold">$126.50</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Recent Clicks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse text-xs">
              <thead className="text-sm bg-gray-50">
                <tr>
                  <th className="py-2">Link</th>
                  <th>Click ID</th>
                  <th>Date</th>
                  <th>Client</th>
                  <th>Country</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="text-center py-2">Link01</td>
                  <td className="text-center">#25426</td>
                  <td className="text-center">Jan 8, 2022</td>
                  <td className="text-center">Leo Gouse</td>
                  <td className="text-center">Asia, China</td>
                  <td className="text-center">2 clicks</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
}
