"use client";

import Layout from "../../components/Layout";
import RequireAuth from "@/components/RequireAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Links", value: 102 },
    { label: "QR codes", value: 5 },
    { label: "Barcodes", value: 6 },
  ];

  const recent = [
    ["Link01", "#25426", "Jan 8, 2022", "Leo Gouse", "Asia, China", "2 clicks"],
    [
      "Link02",
      "#25425",
      "Jan 7, 2022",
      "Jaxson Korsgaard",
      "North America, Canada",
      "2 clicks",
    ],
    ["Link03", "#25424", "Jan 6, 2022", "Talan Botosh", "Europe", "2 clicks"],
    ["Link04", "#25423", "Jan 5, 2022", "Ryan Philips", "Asia", "2 clicks"],
    [
      "Link05",
      "#25422",
      "Jan 4, 2022",
      "Emerson Baptista",
      "South America",
      "2 clicks",
    ],
    ["Link06", "#25421", "Jan 2, 2022", "Jaxson Calzoni", "Europe", "2 clicks"],
  ];

  return (
    <RequireAuth>
      <Layout>
        {/* Page title */}
        <section className="bg-[#f1f1ee] border-b border-gray-200 px-6 py-4 flex items-center justify-between">
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

        <main className="p-6 space-y-6 bg-[#f1f1ee]">
          {/* Row 1: Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s) => (
              <Card
                key={s.label}
                className="bg-[#fafaf8] border border-gray-200 rounded-md"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-gray-800">
                    {s.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between items-center px-4 pb-4">
                  <p className="text-2xl font-bold">{s.value}</p>
                  <span className="text-green-600 text-sm">↑ 34.7%</span>
                </CardContent>
                <div className="px-4 pb-4 text-xs text-gray-400">
                  Compared to Jan 2022
                </div>
              </Card>
            ))}
          </div>

          {/* Row 2: AI Recommendations reserved */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-[#fafaf8] border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="font-bold text-gray-800">
                  AI Recommendation Area
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                  Reserved for future AI-driven activity insights and charts.
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#fafaf8] border border-gray-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-gray-800">
                  AI Best Links Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">
                  Reserved for personalized link recommendations powered by AI.
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Row 3: Recent Clicks */}
          <Card className="bg-[#fafaf8] border border-gray-200">
            <CardHeader className="pb-2">
              <CardTitle className="font-bold text-gray-800">
                Recent Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full border-collapse">
                <thead className="text-sm">
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-2 font-medium text-center">Link</th>
                    <th className="py-3 px-2 font-medium text-center">
                      Click ID
                    </th>
                    <th className="py-3 px-2 font-medium text-center">Date</th>
                    <th className="py-3 px-2 font-medium text-center">
                      Client Name
                    </th>
                    <th className="py-3 px-2 font-medium text-center">
                      Country
                    </th>
                    <th className="py-3 px-2 font-medium text-center">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {recent.map((r, idx) => (
                    <tr
                      key={r[1]}
                      className={idx % 2 === 1 ? "bg-gray-50" : ""}
                    >
                      {r.map((cell, i) => (
                        <td key={i} className="py-3 px-2 text-center">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </main>
      </Layout>
    </RequireAuth>
  );
}
