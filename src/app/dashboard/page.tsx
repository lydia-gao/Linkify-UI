"use client";

import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data for dashboard
const mockStats = {
  totalLinks: 120,
  totalClicks: 5200,
  totalRevenue: 1200,
  linksChange: 10.5,
  clicksChange: 15.2,
  revenueChange: 8.7,
};

const mockClicksOverTime = [
  { month: "Jan", clicks: 400 },
  { month: "Feb", clicks: 600 },
  { month: "Mar", clicks: 550 },
  { month: "Apr", clicks: 700 },
  { month: "May", clicks: 800 },
  { month: "Jun", clicks: 750 },
  { month: "Jul", clicks: 850 },
  { month: "Aug", clicks: 900 },
  { month: "Sep", clicks: 950 },
  { month: "Oct", clicks: 1000 },
  { month: "Nov", clicks: 1100 },
  { month: "Dec", clicks: 1200 },
];

const mockRevenueDetails = [
  { source: "Ad SEO", amount: 450 },
  { source: "Affiliate", amount: 320 },
  { source: "Direct", amount: 280 },
  { source: "Email", amount: 150 },
  { source: "Social", amount: 0 },
];

const mockRecentClicks = [
  {
    clientName: "John Smith",
    country: "USA",
    amount: 25.5,
    date: "2023-02-28",
  },
  {
    clientName: "Sarah Johnson",
    country: "UK",
    amount: 18.75,
    date: "2023-02-28",
  },
  {
    clientName: "Mike Chen",
    country: "Canada",
    amount: 32.0,
    date: "2023-02-27",
  },
  {
    clientName: "Emma Wilson",
    country: "Australia",
    amount: 22.3,
    date: "2023-02-27",
  },
  {
    clientName: "David Brown",
    country: "Germany",
    amount: 28.9,
    date: "2023-02-26",
  },
];

export default function DashboardPage() {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const StatCard = ({
    title,
    value,
    change,
    isCurrency = false,
  }: {
    title: string;
    value: number;
    change: number;
    isCurrency?: boolean;
  }) => {
    const isPositive = change >= 0;
    const formattedValue = isCurrency
      ? formatCurrency(value)
      : formatNumber(value);

    return (
      <Card className="shadow-sm border-0 bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {formattedValue}
              </p>
              <div className="flex items-center space-x-1">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={`text-sm font-medium ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {change}%
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  vs last month
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-6 py-8 max-w-7xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back! Here's what's happening with your links.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Links"
                value={mockStats.totalLinks}
                change={mockStats.linksChange}
              />
              <StatCard
                title="Total Clicks"
                value={mockStats.totalClicks}
                change={mockStats.clicksChange}
              />
              <StatCard
                title="Total Revenue"
                value={mockStats.totalRevenue}
                change={mockStats.revenueChange}
                isCurrency
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Clicks Over Time Chart */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Active Campaigns
                  </CardTitle>
                  <p className="text-sm text-gray-600">Clicks over time</p>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-1">
                    {mockClicksOverTime.map((data, index) => {
                      const maxClicks = Math.max(
                        ...mockClicksOverTime.map((d) => d.clicks)
                      );
                      const height = (data.clicks / maxClicks) * 180;

                      return (
                        <div
                          key={data.month}
                          className="flex flex-col items-center space-y-2 flex-1"
                        >
                          <div
                            className="w-full bg-blue-500 rounded-t max-w-6"
                            style={{ height: `${height}px` }}
                          />
                          <span className="text-xs text-gray-600 font-medium">
                            {data.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Details */}
              <Card className="shadow-sm border-0 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Revenue Sources
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Revenue breakdown by source
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRevenueDetails.map((item, index) => {
                      const colors = [
                        "bg-blue-500",
                        "bg-green-500",
                        "bg-purple-500",
                        "bg-orange-500",
                        "bg-red-500",
                      ];
                      return (
                        <div
                          key={item.source}
                          className="flex items-center justify-between py-2"
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 ${colors[index]} rounded-full`}
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {item.source}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Clicks Table */}
            <Card className="shadow-sm border-0 bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Recent Clicks
                </CardTitle>
                <p className="text-sm text-gray-600">Latest click activity</p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                          Client Name
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                          Country
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockRecentClicks.map((click, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4 text-sm font-medium text-gray-900">
                            {click.clientName}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {click.country}
                          </td>
                          <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                            {formatCurrency(click.amount)}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-500">
                            {click.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <footer className="bg-white border-t px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>© 2023 Linkify. All rights reserved.</div>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-gray-700">
                  Terms
                </a>
                <a href="#" className="hover:text-gray-700">
                  Privacy
                </a>
                <a href="#" className="hover:text-gray-700">
                  Support
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
