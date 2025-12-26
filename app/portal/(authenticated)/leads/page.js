"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  EnvelopeIcon,
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const STATUSES = [
  { value: "new", label: "New", color: "bg-gray-500/20 text-gray-400" },
  { value: "contacted", label: "Contacted", color: "bg-blue-500/20 text-blue-400" },
  { value: "follow_up", label: "Follow Up", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "quote_sent", label: "Quote Sent", color: "bg-purple-500/20 text-purple-400" },
  { value: "in_progress", label: "In Progress", color: "bg-orange-500/20 text-orange-400" },
  { value: "complete", label: "Complete", color: "bg-green-500/20 text-green-400" },
  { value: "lost", label: "Lost", color: "bg-red-500/20 text-red-400" },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedLead, setExpandedLead] = useState(null);
  const [leadEmails, setLeadEmails] = useState({});

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setLeads(leads.map((lead) =>
          lead.id === id ? { ...lead, status } : lead
        ));
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const deleteLead = async (id) => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads(leads.filter((lead) => lead.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const toggleExpand = async (id) => {
    if (expandedLead === id) {
      setExpandedLead(null);
      return;
    }

    setExpandedLead(id);

    // Fetch email history if not already loaded
    if (!leadEmails[id]) {
      try {
        const res = await fetch(`/api/admin/leads/${id}`);
        if (res.ok) {
          const data = await res.json();
          setLeadEmails((prev) => ({
            ...prev,
            [id]: data.sent_emails || [],
          }));
        }
      } catch (error) {
        console.error("Failed to fetch lead emails:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    const found = STATUSES.find((s) => s.value === status);
    return found?.color || "bg-gray-500/20 text-gray-400";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading leads...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Leads</h1>
        <p className="text-gray-400 mt-1">
          Manage your leads and track communication
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        {STATUSES.map((status) => {
          const count = leads.filter((l) => (l.status || "new") === status.value).length;
          return (
            <div
              key={status.value}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-center"
            >
              <p className="text-2xl font-bold text-white">{count}</p>
              <p className={`text-xs mt-1 ${status.color.split(" ")[1]}`}>
                {status.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
        {leads.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-400">
              No leads yet. They will appear here when customers submit the contact form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/50">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium w-8"></th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Phone</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <React.Fragment key={lead.id}>
                    <tr
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 cursor-pointer"
                      onClick={() => toggleExpand(lead.id)}
                    >
                      <td className="py-3 px-4">
                        {expandedLead === lead.id ? (
                          <ChevronUpIcon className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-white font-medium">{lead.name}</td>
                      <td className="py-3 px-4 text-gray-300">{lead.email}</td>
                      <td className="py-3 px-4 text-gray-300">
                        <a
                          href={`tel:${lead.phone}`}
                          className="text-gold-500 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {lead.phone}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {lead.source || "direct"}
                        </span>
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status || "new"}
                          onChange={(e) => updateStatus(lead.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${getStatusColor(lead.status || "new")}`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-gray-400 text-sm">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/portal/email?lead=${lead.id}`}
                            className="p-2 text-gold-500 hover:bg-gray-700 rounded-lg transition-colors"
                            title="Send email"
                          >
                            <EnvelopeIcon className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                            title="Delete lead"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* Expanded Email History */}
                    {expandedLead === lead.id && (
                      <tr>
                        <td colSpan={8} className="bg-gray-800/50 px-8 py-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-medium">Email History</h4>
                              <Link
                                href={`/portal/email?lead=${lead.id}`}
                                className="text-sm text-gold-500 hover:underline"
                              >
                                Send new email →
                              </Link>
                            </div>
                            {!leadEmails[lead.id] ? (
                              <p className="text-gray-400 text-sm">Loading...</p>
                            ) : leadEmails[lead.id].length === 0 ? (
                              <p className="text-gray-400 text-sm">
                                No emails sent yet.
                              </p>
                            ) : (
                              <div className="space-y-3">
                                {leadEmails[lead.id].map((email) => (
                                  <div
                                    key={email.id}
                                    className="bg-gray-900 border border-gray-700 rounded-lg p-4"
                                  >
                                    <div className="flex items-center justify-between mb-2">
                                      <p className="text-white font-medium">
                                        {email.subject}
                                      </p>
                                      <p className="text-gray-500 text-xs">
                                        {new Date(email.sent_at).toLocaleString()}
                                      </p>
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                      {email.content}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
