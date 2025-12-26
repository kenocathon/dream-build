"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  PaperAirplaneIcon,
  SparklesIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const AI_TONES = [
  { value: "professional", label: "Professional", description: "Formal business tone" },
  { value: "friendly", label: "Friendly", description: "Warm and personable" },
  { value: "follow_up", label: "Follow Up", description: "Gentle reminder style" },
  { value: "generate", label: "Generate New", description: "Create from scratch" },
];

export default function EmailPage() {
  const searchParams = useSearchParams();
  const leadId = searchParams.get("lead");

  const [leads, setLeads] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentEmails, setSentEmails] = useState([]);

  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [aiTone, setAiTone] = useState("professional");

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (leadId && leads.length > 0) {
      const lead = leads.find((l) => l.id === leadId);
      if (lead) {
        selectLead(lead);
      }
    }
  }, [leadId, leads]);

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

  const selectLead = async (lead) => {
    setSelectedLead(lead);
    setToEmail(lead.email);
    setSent(false);

    // Fetch sent emails for this lead
    try {
      const res = await fetch(`/api/admin/leads/${lead.id}`);
      if (res.ok) {
        const data = await res.json();
        setSentEmails(data.sent_emails || []);
      }
    } catch (error) {
      console.error("Failed to fetch lead details:", error);
    }
  };

  const handleLeadChange = (e) => {
    const lead = leads.find((l) => l.id === e.target.value);
    if (lead) {
      selectLead(lead);
    } else {
      setSelectedLead(null);
      setToEmail("");
      setSentEmails([]);
    }
  };

  const handleGenerate = async () => {
    if (!selectedLead && !toEmail) {
      alert("Please select a lead or enter an email address");
      return;
    }

    setGenerating(true);

    try {
      const res = await fetch("/api/admin/email/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_name: selectedLead?.name || "",
          existing_content: content,
          tone: aiTone,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Generation failed");
      }

      const data = await res.json();
      setContent(data.content);

      // Also suggest a subject if empty
      if (!subject && data.subject) {
        setSubject(data.subject);
      }
    } catch (error) {
      alert("Failed to generate: " + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!toEmail || !subject || !content) {
      alert("Please fill in all fields");
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/admin/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead_id: selectedLead?.id || null,
          to_email: toEmail,
          subject,
          content,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to send");
      }

      setSent(true);
      setSubject("");
      setContent("");

      // Refresh sent emails
      if (selectedLead) {
        const leadRes = await fetch(`/api/admin/leads/${selectedLead.id}`);
        if (leadRes.ok) {
          const data = await leadRes.json();
          setSentEmails(data.sent_emails || []);
        }
      }
    } catch (error) {
      alert("Failed to send email: " + error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/portal/leads"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Leads
        </Link>
        <h1 className="text-3xl font-bold text-white">Email Composer</h1>
        <p className="text-gray-400 mt-1">
          Send branded emails from support@dbluxuryglass.com
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Success Message */}
          {sent && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center gap-3">
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
              <p className="text-green-400">Email sent successfully!</p>
            </div>
          )}

          {/* Lead Selector */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select Lead (optional)
            </label>
            <select
              value={selectedLead?.id || ""}
              onChange={handleLeadChange}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-500"
            >
              <option value="">-- Select a lead or enter email manually --</option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} ({lead.email})
                </option>
              ))}
            </select>
          </div>

          {/* Email Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
            {/* To */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To
              </label>
              <input
                type="email"
                value={toEmail}
                onChange={(e) => setToEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Email subject"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* AI Assist */}
            <div className="flex items-center gap-4 py-2">
              <select
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-gold-500"
              >
                {AI_TONES.map((tone) => (
                  <option key={tone.value} value={tone.value}>
                    {tone.label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                <SparklesIcon className="h-4 w-4" />
                {generating ? "Generating..." : "AI Assist"}
              </button>
              <span className="text-gray-500 text-sm">
                {AI_TONES.find((t) => t.value === aiTone)?.description}
              </span>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="Write your email here... It will be wrapped in our branded template."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 resize-none"
              />
              <p className="text-gray-500 text-xs mt-2">
                Your message will be wrapped in a professional HTML template with our branding.
              </p>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={sending || !toEmail || !subject || !content}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 text-deepblack font-bold py-3 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
              {sending ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>

        {/* Sent History */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-4">Sent History</h2>

          {!selectedLead ? (
            <p className="text-gray-400 text-sm">
              Select a lead to see email history.
            </p>
          ) : sentEmails.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No emails sent to this lead yet.
            </p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {sentEmails.map((email) => (
                <div
                  key={email.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4"
                >
                  <p className="text-white font-medium text-sm mb-1">
                    {email.subject}
                  </p>
                  <p className="text-gray-400 text-xs mb-2">
                    {new Date(email.sent_at).toLocaleString()}
                  </p>
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {email.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
