"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import StatsCard from "@/components/StatsCard";

// Mock data for dashboard
const mockStats = [
  {
    title: "Links",
    value: 102,
    change: "34.7%",
    subtitle: "Compared to Jan 2022",
  },
  {
    title: "QR codes",
    value: 5,
    change: "34.7%",
    subtitle: "Compared to Jan 2022",
  },
  {
    title: "Barcodes",
    value: 6,
    change: "34.7%",
    subtitle: "Compared to Jan 2022",
  },
];

const mockBestLinks = [
  { name: "Link01", amount: "$126.50", lastClick: "01-08-2022 14:32" },
  { name: "QRCode02", amount: "$126.50", lastClick: "01-07-2022 16:10" },
  { name: "Barcode03", amount: "$126.50", lastClick: "01-06-2022 11:25" },
];

const mockRecentClicks = [
  {
    link: "Link01",
    clickid: "#25426",
    date: "Jan 8, 2022",
    clientname: "Leo Gouse",
    country: "Asia, China",
    amount: "2 clicks",
  },
  {
    link: "Link02",
    clickid: "#25425",
    date: "Jan 7, 2022",
    clientname: "Jaxson Korsgaard",
    country: "North America, Canada",
    amount: "2 clicks",
  },
  {
    link: "Link03",
    clickid: "#25424",
    date: "Jan 6, 2022",
    clientname: "Talan Botosh",
    country: "Europe",
    amount: "2 clicks",
  },
  {
    link: "Link04",
    clickid: "#25423",
    date: "Jan 5, 2022",
    clientname: "Ryan Philips",
    country: "Asia",
    amount: "2 clicks",
  },
  {
    link: "Link05",
    clickid: "#25422",
    date: "Jan 4, 2022",
    clientname: "Emerson Baptista",
    country: "South America",
    amount: "2 clicks",
  },
  {
    link: "Link06",
    clickid: "#25421",
    date: "Jan 2, 2022",
    clientname: "Jaxson Calzoni",
    country: "Europe",
    amount: "2 clicks",
  },
];

export default function DashboardPage() {
  return (
    <DashboardLayout
      pageTitle="Dashboard"
      breadcrumb="Home > Dashboard"
      showDateRange={true}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            subtitle={stat.subtitle}
          />
        ))}
      </div>

      {/* Graph + Best Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Graph */}
        <div className="lg:col-span-2 bg-white shadow rounded-md p-4">
          <p className="font-bold text-gray-800 border-b pb-2 mb-4">
            Activity Graph
          </p>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 ml-auto">
              <button className="px-3 py-1 text-xs border rounded-md">
                WEEKLY
              </button>
              <button className="px-3 py-1 text-xs border rounded-md bg-black text-white">
                MONTHLY
              </button>
              <button className="px-3 py-1 text-xs border rounded-md">
                YEARLY
              </button>
            </div>
          </div>
          <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
            [Graph Placeholder]
          </div>
        </div>

        {/* Best Links */}
        <div className="bg-white shadow rounded-md p-4">
          <p className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">
            Best Links
          </p>
          <ul className="text-sm mt-2 space-y-4">
            {mockBestLinks.map((link, index) => (
              <li key={index}>
                <div className="flex justify-between">
                  <span>{link.name}</span>
                  <span className="font-bold">{link.amount}</span>
                </div>
                <p className="text-xs text-gray-400">
                  last click: {link.lastClick}
                </p>
              </li>
            ))}
          </ul>
          <button className="mt-4 w-full text-xs bg-black text-white py-1 rounded-md">
            REPORT
          </button>
        </div>
      </div>

      {/* Recent Clicks Table */}
      <div className="bg-white shadow rounded-md p-4">
        <p className="font-bold text-gray-800 mb-4">Recent Clicks</p>
        <table className="w-full border-collapse">
          <thead className="text-sm">
            <tr className="border-b bg-gray-50">
              <th className="py-3 px-2 font-medium text-center">Link</th>
              <th className="py-3 px-2 font-medium text-center">Click ID</th>
              <th className="py-3 px-2 font-medium text-center">Date</th>
              <th className="py-3 px-2 font-medium text-center">Client Name</th>
              <th className="py-3 px-2 font-medium text-center">Country</th>
              <th className="py-3 px-2 font-medium text-center">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y text-xs">
            {mockRecentClicks.map((click, index) => (
              <tr key={index} className={index % 2 === 1 ? "bg-gray-50" : ""}>
                <td className="py-3 px-2 text-center">{click.link}</td>
                <td className="text-center">{click.clickid}</td>
                <td className="text-center">{click.date}</td>
                <td className="text-center">{click.clientname}</td>
                <td className="text-center">{click.country}</td>
                <td className="text-center">{click.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
