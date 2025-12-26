"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/admin/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setJobs(jobs.filter((job) => job.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Jobs</h1>
          <p className="text-gray-400 mt-1">Manage your completed projects</p>
        </div>
        <Link
          href="/portal/jobs/new"
          className="inline-flex items-center gap-2 bg-gold-500 text-deepblack font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          New Job
        </Link>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-400">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
          <p className="text-gray-400 mb-4">No jobs yet. Add your first completed project!</p>
          <Link
            href="/portal/jobs/new"
            className="inline-flex items-center gap-2 bg-gold-500 text-deepblack font-bold px-6 py-3 rounded-lg hover:bg-gold-600 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            Add Job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-video bg-gray-800">
                {job.image_url ? (
                  <Image
                    src={job.image_url}
                    alt={job.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-2">{job.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                  {job.description || "No description"}
                </p>
                <p className="text-gray-500 text-xs mb-4">
                  {new Date(job.created_at).toLocaleDateString()}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/portal/posts?job=${job.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-gold-500 text-deepblack font-medium px-4 py-2 rounded-lg hover:bg-gold-600 transition-colors text-sm"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    Create Post
                  </Link>
                  <Link
                    href={`/portal/jobs/${job.id}`}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
                    disabled={deleting === job.id}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
