"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Link from "next/link";
import { UserGroupIcon, ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const COLORS = ["#D4AF37", "#60A5FA", "#34D399", "#F87171", "#A78BFA", "#FBBF24"];

export default function AnalyticsPage() {
  const [data, setData] = useState({
    total: 0,
    bySource: [],
    byDate: [],
    byCampaign: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/admin/analytics");
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">Track your leads and marketing performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gold-500 p-3 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-deepblack" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Leads</p>
              <p className="text-3xl font-bold text-white">{data.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Top Source</p>
              <p className="text-xl font-bold text-white">
                {data.bySource[0]?.name || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">This Week</p>
              <p className="text-3xl font-bold text-white">
                {data.byDate.slice(-7).reduce((sum, d) => sum + d.leads, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="bg-purple-500 p-3 rounded-lg">
              <ArrowTrendingUpIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Campaigns</p>
              <p className="text-3xl font-bold text-white">
                {data.byCampaign.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leads Over Time */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Leads Over Time</h2>
          <div className="h-64">
            {data.byDate.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.byDate}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="date"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#D4AF37"
                    strokeWidth={2}
                    dot={{ fill: "#D4AF37" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data yet
              </div>
            )}
          </div>
        </div>

        {/* Leads by Source */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Leads by Source</h2>
          <div className="h-64">
            {data.bySource.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.bySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {data.bySource.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No data yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      {data.byCampaign.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Campaign Performance</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byCampaign}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#D4AF37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Manage Leads Link */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Manage Your Leads</h2>
            <p className="text-gray-400">
              View all leads, update status, and send emails.
            </p>
          </div>
          <Link
            href="/portal/leads"
            className="bg-gold-500 text-deepblack font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors whitespace-nowrap"
          >
            View Leads
          </Link>
        </div>
      </div>

      {/* Campaigns Link */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Track Your Marketing</h2>
            <p className="text-gray-400">
              Create trackable links and QR codes to see which campaigns bring in leads.
            </p>
          </div>
          <a
            href="/portal/campaigns"
            className="bg-gold-500 text-deepblack font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors whitespace-nowrap"
          >
            Create Campaign
          </a>
        </div>
      </div>
    </div>
  );
}
