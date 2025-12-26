"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  SparklesIcon,
  ClipboardIcon,
  CheckIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function PostsPage() {
  const [jobs, setJobs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(null);

  // Form state
  const [selectedJob, setSelectedJob] = useState("");
  const [platform, setPlatform] = useState("both");
  const [generatedContent, setGeneratedContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState("");

  useEffect(() => {
    fetchData();

    // Get job ID from URL if present
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const jobId = params.get("job");
      if (jobId) {
        setSelectedJob(jobId);
      }
    }
  }, []);

  const fetchData = async () => {
    try {
      const [jobsRes, postsRes] = await Promise.all([
        fetch("/api/admin/jobs"),
        fetch("/api/admin/posts"),
      ]);

      if (jobsRes.ok) setJobs(await jobsRes.json());
      if (postsRes.ok) setPosts(await postsRes.json());
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!selectedJob) return;

    const job = jobs.find((j) => j.id === selectedJob);
    if (!job) return;

    setGenerating(true);
    setGeneratedContent([]);

    try {
      const res = await fetch("/api/admin/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobName: job.name,
          jobDescription: job.description,
          platform: platform === "both" ? "instagram" : platform,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Generation failed");
      }

      const data = await res.json();
      setGeneratedContent(data.variations || []);
      if (data.variations?.length > 0) {
        setSelectedContent(data.variations[0].content);
      }
    } catch (error) {
      alert("Failed to generate: " + error.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleSavePost = async () => {
    if (!selectedContent) return;

    const job = jobs.find((j) => j.id === selectedJob);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          job_id: selectedJob || null,
          platform,
          content: selectedContent,
          image_url: job?.image_url || null,
          status: "draft",
        }),
      });

      if (!res.ok) throw new Error("Failed to save");

      const newPost = await res.json();
      setPosts([newPost, ...posts]);
      setSelectedContent("");
      setGeneratedContent([]);
      setSelectedJob("");
    } catch (error) {
      alert("Failed to save post: " + error.message);
    }
  };

  const handleCopy = async (content, id) => {
    await navigator.clipboard.writeText(content);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts(posts.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "posted":
        return "bg-green-500/20 text-green-400";
      case "scheduled":
        return "bg-blue-500/20 text-blue-400";
      case "failed":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Social Posts</h1>
        <p className="text-gray-400 mt-1">Generate and manage social media content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Generator */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-gold-500" />
            Generate Post
          </h2>

          <div className="space-y-4">
            {/* Job Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Job (optional)
              </label>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-500"
              >
                <option value="">-- Select a job --</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Platform
              </label>
              <div className="flex gap-2">
                {["both", "facebook", "instagram"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      platform === p
                        ? "bg-gold-500 text-deepblack"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !selectedJob}
              className="w-full bg-gold-500 text-deepblack font-bold py-3 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="h-5 w-5" />
                  Generate with AI
                </>
              )}
            </button>

            {/* Generated Variations */}
            {generatedContent.length > 0 && (
              <div className="mt-6 space-y-4">
                <p className="text-sm font-medium text-gray-300">
                  Select a variation:
                </p>
                {generatedContent.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedContent(v.content)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors ${
                      selectedContent === v.content
                        ? "border-gold-500 bg-gold-500/10"
                        : "border-gray-700 bg-gray-800 hover:border-gray-600"
                    }`}
                  >
                    <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-4">
                      {v.content}
                    </p>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Content Editor */}
            {selectedContent && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Edit Post
                </label>
                <textarea
                  value={selectedContent}
                  onChange={(e) => setSelectedContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold-500 resize-none"
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleSavePost}
                    className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save as Draft
                  </button>
                  <button
                    onClick={() => handleCopy(selectedContent, "editor")}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    {copied === "editor" ? (
                      <CheckIcon className="h-5 w-5 text-green-400" />
                    ) : (
                      <ClipboardIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saved Posts */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-6">Saved Posts</h2>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-gray-400">No posts yet. Generate your first post!</p>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 bg-gray-800 rounded-lg border border-gray-700"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.platform}
                    </span>
                  </div>

                  {post.jobs?.name && (
                    <p className="text-gold-500 text-sm font-medium mb-2">
                      {post.jobs.name}
                    </p>
                  )}

                  <p className="text-gray-300 text-sm whitespace-pre-wrap line-clamp-4 mb-3">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(post.content, post.id)}
                      className="flex items-center gap-1 text-gray-400 hover:text-white text-sm"
                    >
                      {copied === post.id ? (
                        <>
                          <CheckIcon className="h-4 w-4 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <ClipboardIcon className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-gray-400 hover:text-red-400 ml-auto"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
