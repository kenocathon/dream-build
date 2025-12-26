"use client";

import { useState, useRef, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  LinkIcon,
  ClipboardIcon,
  CheckIcon,
  QrCodeIcon,
  PrinterIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

const SOURCES = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "google", label: "Google Ads" },
  { value: "email", label: "Email" },
  { value: "flyer", label: "Flyer/Print" },
  { value: "referral", label: "Referral" },
];

const MEDIUMS = [
  { value: "social", label: "Social Media" },
  { value: "cpc", label: "Paid Ads (CPC)" },
  { value: "email", label: "Email" },
  { value: "print", label: "Print Material" },
  { value: "qr", label: "QR Code (Coasters, Signs, etc.)" },
  { value: "referral", label: "Referral" },
];

const QR_PLACEMENTS = [
  { value: "", label: "-- Select placement --" },
  { value: "coaster", label: "Drink Coaster" },
  { value: "flyer", label: "Flyer/Brochure" },
  { value: "business-card", label: "Business Card" },
  { value: "yard-sign", label: "Yard/Job Site Sign" },
  { value: "vehicle", label: "Vehicle Wrap/Magnet" },
  { value: "storefront", label: "Storefront/Window" },
  { value: "other", label: "Other" },
];

export default function CampaignsPage() {
  const [source, setSource] = useState("facebook");
  const [medium, setMedium] = useState("social");
  const [campaign, setCampaign] = useState("");
  const [placement, setPlacement] = useState("");
  const [location, setLocation] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortening, setShortening] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [savedCampaigns, setSavedCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const qrRef = useRef(null);

  const baseUrl = "https://dbluxuryglass.com";
  const isQRMode = medium === "qr";

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const res = await fetch("/api/admin/campaigns");
      if (res.ok) {
        const data = await res.json();
        setSavedCampaigns(data);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    }
  };

  const saveCampaign = async () => {
    if (!generatedUrl) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: campaign,
          source: isQRMode ? "qr" : source,
          medium: isQRMode ? "print" : medium,
          placement: placement || null,
          location: location || null,
          full_url: generatedUrl,
          short_url: shortUrl || null,
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const newCampaign = await res.json();
      setSavedCampaigns([newCampaign, ...savedCampaigns]);

      // Reset form
      setSource("facebook");
      setMedium("social");
      setCampaign("");
      setPlacement("");
      setLocation("");
      setGeneratedUrl("");
      setShortUrl("");
      setShowQR(false);
      setSelectedCampaign(null);
    } catch (error) {
      alert("Failed to save campaign: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteCampaign = async (id) => {
    if (!confirm("Delete this campaign?")) return;

    try {
      const res = await fetch(`/api/admin/campaigns/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSavedCampaigns(savedCampaigns.filter((c) => c.id !== id));
        if (selectedCampaign?.id === id) {
          setSelectedCampaign(null);
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const loadCampaign = (c) => {
    setSelectedCampaign(c);
    setGeneratedUrl(c.full_url);
    setShortUrl(c.short_url || "");
    setShowQR(true); // Always show QR when viewing a campaign
    setCampaign(c.name);
    setSource(c.source);
    setMedium(c.medium);
    setPlacement(c.placement || "");
    setLocation(c.location || "");

    // Scroll to top to see the QR code
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generateUrl = () => {
    if (!campaign.trim()) {
      alert("Please enter a campaign name");
      return;
    }

    if (isQRMode && !placement) {
      alert("Please select a QR placement type");
      return;
    }

    // Build campaign name with placement and location for QR tracking
    let campaignName = campaign.toLowerCase().replace(/\s+/g, "-");
    if (isQRMode) {
      campaignName = placement;
      if (location.trim()) {
        campaignName += `-${location.toLowerCase().replace(/\s+/g, "-")}`;
      }
      campaignName += `-${campaign.toLowerCase().replace(/\s+/g, "-")}`;
    }

    const params = new URLSearchParams({
      utm_source: isQRMode ? "qr" : source,
      utm_medium: isQRMode ? "print" : medium,
      utm_campaign: campaignName,
    });

    const fullUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedUrl(fullUrl);
    setShortUrl("");
    setShowQR(isQRMode); // Auto-show QR code in QR mode
  };

  const shortenUrl = async () => {
    if (!generatedUrl) return;

    setShortening(true);
    try {
      const res = await fetch("/api/admin/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: generatedUrl }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to shorten");
      }

      const data = await res.json();
      setShortUrl(data.shortUrl);
    } catch (error) {
      alert("Failed to shorten URL: " + error.message);
    } finally {
      setShortening(false);
    }
  };

  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const data = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    canvas.width = 512;
    canvas.height = 512;

    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const link = document.createElement("a");
      link.download = `qr-${campaign || "dreambuild"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(data)));
  };

  const printQR = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - Dream Build</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            .container { text-align: center; }
            h1 { color: #D4AF37; margin-bottom: 10px; }
            p { color: #666; margin-bottom: 30px; }
            svg { width: 300px; height: 300px; }
            .url { font-size: 12px; color: #999; margin-top: 20px; word-break: break-all; max-width: 300px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Dream Build Luxury Glass</h1>
            <p>Scan for a free quote</p>
            ${svg.outerHTML}
            <p class="url">${shortUrl || generatedUrl}</p>
          </div>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Dream Build Luxury Glass",
          text: "Get a free quote for custom glass installation",
          url: shortUrl || generatedUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      handleCopy(shortUrl || generatedUrl, "share");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Campaigns</h1>
        <p className="text-gray-400 mt-1">Generate trackable links and QR codes for marketing</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Link Generator */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-gold-500" />
            UTM Link Generator
          </h2>

          <div className="space-y-4">
            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Traffic Source
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-500"
              >
                {SOURCES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Medium */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Medium
              </label>
              <select
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-500"
              >
                {MEDIUMS.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* QR-specific fields */}
            {isQRMode && (
              <>
                {/* Placement Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    QR Placement Type *
                  </label>
                  <select
                    value={placement}
                    onChange={(e) => setPlacement(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-500"
                  >
                    {QR_PLACEMENTS.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location / Venue Name
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Joes Bar Cumming, Main St Alpharetta"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Track which restaurant, store, or location this QR code is placed at
                  </p>
                </div>
              </>
            )}

            {/* Campaign */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {isQRMode ? "Campaign / Batch Name" : "Campaign Name"}
              </label>
              <input
                type="text"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="e.g., spring-2025, shower-promo"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateUrl}
              className="w-full bg-gold-500 text-deepblack font-bold py-3 rounded-lg hover:bg-gold-600 transition-colors"
            >
              Generate Link
            </button>

            {/* Generated URL */}
            {generatedUrl && (
              <div className="mt-6 space-y-4">
                {/* Full URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={generatedUrl}
                      readOnly
                      className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm"
                    />
                    <button
                      onClick={() => handleCopy(generatedUrl, "full")}
                      className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      {copied === "full" ? (
                        <CheckIcon className="h-5 w-5 text-green-400" />
                      ) : (
                        <ClipboardIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Shorten Button */}
                {!shortUrl && (
                  <button
                    onClick={shortenUrl}
                    disabled={shortening}
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {shortening ? "Shortening..." : "Shorten with Bitly"}
                  </button>
                )}

                {/* Short URL */}
                {shortUrl && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Short URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={shortUrl}
                        readOnly
                        className="flex-1 px-4 py-3 bg-gray-800 border border-gold-500 rounded-lg text-gold-500 font-medium"
                      />
                      <button
                        onClick={() => handleCopy(shortUrl, "short")}
                        className="px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        {copied === "short" ? (
                          <CheckIcon className="h-5 w-5 text-green-400" />
                        ) : (
                          <ClipboardIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* QR Code Toggle */}
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                >
                  <QrCodeIcon className="h-5 w-5" />
                  {showQR ? "Hide QR Code" : "Generate QR Code"}
                </button>

                {/* Save Campaign Button */}
                <button
                  onClick={saveCampaign}
                  disabled={saving}
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Campaign"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* QR Code Display */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <QrCodeIcon className="h-5 w-5 text-gold-500" />
            QR Code
          </h2>

          {showQR && generatedUrl ? (
            <div className="space-y-6">
              {/* QR Code */}
              <div
                ref={qrRef}
                className="bg-white p-6 rounded-lg flex items-center justify-center mx-auto"
                style={{ width: "fit-content" }}
              >
                <QRCodeSVG
                  value={shortUrl || generatedUrl}
                  size={200}
                  level="H"
                  includeMargin={true}
                  fgColor="#0A0A0A"
                  bgColor="#FFFFFF"
                />
              </div>

              {/* Campaign Info */}
              <div className="text-center">
                <p className="text-gold-500 font-medium">{campaign}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {source} / {medium}
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={downloadQR}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowDownTrayIcon className="h-6 w-6 text-gold-500" />
                  <span className="text-sm text-gray-300">Download</span>
                </button>
                <button
                  onClick={printQR}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <PrinterIcon className="h-6 w-6 text-gold-500" />
                  <span className="text-sm text-gray-300">Print</span>
                </button>
                <button
                  onClick={shareQR}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ShareIcon className="h-6 w-6 text-gold-500" />
                  <span className="text-sm text-gray-300">Share</span>
                </button>
              </div>

              {/* Usage Tips */}
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Tip:</strong> Print this QR code on
                  business cards, flyers, or job site signs. When scanned, it will
                  track leads from this campaign.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <QrCodeIcon className="h-16 w-16 mb-4" />
              <p>Generate a link first, then click "Generate QR Code"</p>
            </div>
          )}
        </div>
      </div>

      {/* Saved Campaigns */}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-6">Saved Campaigns</h2>
        {savedCampaigns.length === 0 ? (
          <p className="text-gray-400">No campaigns saved yet. Generate and save your first campaign above.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Placement</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Created</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedCampaigns.map((c) => (
                  <tr key={c.id} className="border-b border-gray-800/50 hover:bg-gray-800/50">
                    <td className="py-3 px-4 text-white font-medium">{c.name}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                        {c.source}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{c.placement || "-"}</td>
                    <td className="py-3 px-4 text-gray-300">{c.location || "-"}</td>
                    <td className="py-3 px-4 text-gray-400 text-sm">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => loadCampaign(c)}
                          className="text-gold-500 hover:text-gold-400 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleCopy(c.short_url || c.full_url, c.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          {copied === c.id ? (
                            <CheckIcon className="h-4 w-4 text-green-400" />
                          ) : (
                            <ClipboardIcon className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteCampaign(c.id)}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
