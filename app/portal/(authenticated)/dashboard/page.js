"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  MegaphoneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    jobs: 0,
    posts: 0,
    leads: 0,
    campaigns: 0,
    recentLeads: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: "Total Jobs",
      value: stats.jobs,
      icon: BriefcaseIcon,
      href: "/portal/jobs",
      color: "bg-blue-500",
    },
    {
      name: "Social Posts",
      value: stats.posts,
      icon: ChatBubbleLeftRightIcon,
      href: "/portal/posts",
      color: "bg-purple-500",
    },
    {
      name: "Campaigns",
      value: stats.campaigns,
      icon: MegaphoneIcon,
      href: "/portal/campaigns",
      color: "bg-orange-500",
    },
    {
      name: "Total Leads",
      value: stats.leads,
      icon: UserGroupIcon,
      href: "/portal/analytics",
      color: "bg-green-500",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's your overview.</p>
        </div>
        <Link
          href="/portal/jobs/new"
          className="inline-flex items-center gap-2 bg-gold-500 text-deepblack font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          New Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-2xl font-bold text-white">
                  {loading ? "..." : stat.value}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Leads</h2>
            <Link
              href="/portal/analytics"
              className="text-gold-500 hover:text-gold-400 text-sm"
            >
              View all &rarr;
            </Link>
          </div>
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : stats.recentLeads.length > 0 ? (
            <div className="space-y-3">
              {stats.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">{lead.name}</p>
                    <p className="text-gray-400 text-sm">{lead.email}</p>
                  </div>
                  <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                    {lead.source || "direct"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No leads yet. They'll appear here when customers submit the contact form.</p>
          )}
        </div>

        {/* Quick Links */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/portal/jobs/new"
              className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <BriefcaseIcon className="h-5 w-5 text-gold-500" />
              <div>
                <p className="text-white font-medium">Add New Job</p>
                <p className="text-gray-400 text-sm">Record a completed project</p>
              </div>
            </Link>
            <Link
              href="/portal/posts"
              className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-gold-500" />
              <div>
                <p className="text-white font-medium">Create Social Post</p>
                <p className="text-gray-400 text-sm">Generate AI-powered content</p>
              </div>
            </Link>
            <Link
              href="/portal/analytics"
              className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <UserGroupIcon className="h-5 w-5 text-gold-500" />
              <div>
                <p className="text-white font-medium">View Analytics</p>
                <p className="text-gray-400 text-sm">Track lead sources & campaigns</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
