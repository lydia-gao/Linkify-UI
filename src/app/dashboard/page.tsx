"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { fetchStats } from "@/store/slices/linksSlice";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { StatCard } from "@/components/ui/StatCard";
import { GraphCard } from "@/components/ui/GraphCard";
import { DataTable } from "@/components/ui/Table";
import { Button } from "@/components/ui/button";
import { StatsData, BestLink, RecentClick } from "@/types";

// Mock data - replace with actual API calls
const mockStats: StatsData = {
  links: {
    total: 102,
    change: 34.7,
    changeType: "positive",
  },
  qrCodes: {
    total: 5,
    change: 34.7,
    changeType: "positive",
  },
  barcodes: {
    total: 6,
    change: 34.7,
    changeType: "positive",
  },
};

const mockBestLinks: BestLink[] = [
  { id: "1", name: "Link01", amount: "$126.50", lastClick: "01-08-2022 14:32" },
  {
    id: "2",
    name: "QRCode02",
    amount: "$126.50",
    lastClick: "01-07-2022 16:10",
  },
  {
    id: "3",
    name: "Barcode03",
    amount: "$126.50",
    lastClick: "01-06-2022 11:25",
  },
];

const mockRecentClicks: RecentClick[] = [
  {
    id: "1",
    link: "Link01",
    clickId: "#25426",
    date: "Jan 8, 2022",
    clientName: "Leo Gouse",
    country: "Asia, China",
    amount: "2 clicks",
  },
  {
    id: "2",
    link: "Link02",
    clickId: "#25425",
    date: "Jan 7, 2022",
    clientName: "Jaxson Korsgaard",
    country: "North America, Canada",
    amount: "2 clicks",
  },
  {
    id: "3",
    link: "Link03",
    clickId: "#25424",
    date: "Jan 6, 2022",
    clientName: "Talan Botosh",
    country: "Europe",
    amount: "2 clicks",
  },
  {
    id: "4",
    link: "Link04",
    clickId: "#25423",
    date: "Jan 5, 2022",
    clientName: "Ryan Philips",
    country: "Asia",
    amount: "2 clicks",
  },
  {
    id: "5",
    link: "Link05",
    clickId: "#25422",
    date: "Jan 4, 2022",
    clientName: "Emerson Baptista",
    country: "South America",
    amount: "2 clicks",
  },
  {
    id: "6",
    link: "Link06",
    clickId: "#25421",
    date: "Jan 2, 2022",
    clientName: "Jaxson Calzoni",
    country: "Europe",
    amount: "2 clicks",
  },
];

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.links);

  useEffect(() => {
    // Fetch dashboard data on component mount
    dispatch(fetchStats());
  }, [dispatch]);

  if (error) {
    return (
      <DashboardLayout
        pageTitle="Dashboard"
        breadcrumb="Home > Dashboard"
        showDateRange={true}
      >
        <div className="text-center text-red-500">
          Error loading dashboard: {error}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      pageTitle="Dashboard"
      breadcrumb="Home > Dashboard"
      showDateRange={true}
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Links"
          value={mockStats.links.total}
          change={`${mockStats.links.change}%`}
          changeType={mockStats.links.changeType}
          subtitle="Compared to Jan 2022"
        />
        <StatCard
          title="QR codes"
          value={mockStats.qrCodes.total}
          change={`${mockStats.qrCodes.change}%`}
          changeType={mockStats.qrCodes.changeType}
          subtitle="Compared to Jan 2022"
        />
        <StatCard
          title="Barcodes"
          value={mockStats.barcodes.total}
          change={`${mockStats.barcodes.change}%`}
          changeType={mockStats.barcodes.changeType}
          subtitle="Compared to Jan 2022"
        />
      </div>

      {/* Graph + Best Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Graph */}
        <GraphCard title="Activity Graph">
          {/* You can add your chart component here */}
          <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
            [Chart Component Placeholder]
          </div>
        </GraphCard>

        {/* Best Links */}
        <div className="bg-white shadow rounded-md p-4">
          <p className="text-sm font-bold text-gray-800 border-b pb-2 mb-4">
            Best Links
          </p>
          <ul className="text-sm mt-2 space-y-4">
            {mockBestLinks.map((link) => (
              <li key={link.id}>
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
          <Button size="sm" className="mt-4 w-full text-xs">
            REPORT
          </Button>
        </div>
      </div>

      {/* Recent Clicks Table */}
      <DataTable
        title="Recent Clicks"
        headers={[
          "Link",
          "Click ID",
          "Date",
          "Client Name",
          "Country",
          "Amount",
        ]}
        data={mockRecentClicks}
      />

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            Loading dashboard data...
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
