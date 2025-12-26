"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, PhotoIcon } from "@heroicons/react/24/outline";

export default function EditJobPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`/api/admin/jobs/${id}`);
      if (!res.ok) throw new Error("Job not found");

      const job = await res.json();
      setFormData({
        name: job.name || "",
        description: job.description || "",
        image_url: job.image_url || "",
      });
      setImagePreview(job.image_url || null);
    } catch (err) {
      setError("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setSaving(true);
    try {
      const uploadForm = new FormData();
      uploadForm.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadForm,
      });

      if (!res.ok) throw new Error("Upload failed");

      const { url } = await res.json();
      setFormData({ ...formData, image_url: url });
    } catch (err) {
      setError("Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update job");
      }

      router.push("/admin/jobs");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Jobs
        </Link>
        <h1 className="text-3xl font-bold text-white">Edit Job</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Job Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Image
          </label>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData({ ...formData, image_url: "" });
                  }}
                  className="mt-4 text-red-400 hover:text-red-300"
                >
                  Remove image
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <PhotoIcon className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                <p className="text-gray-400 mb-2">Click to upload an image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Or URL */}
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-300 mb-2">
            Or paste image URL
          </label>
          <input
            type="url"
            id="image_url"
            value={formData.image_url}
            onChange={(e) => {
              setFormData({ ...formData, image_url: e.target.value });
              setImagePreview(e.target.value);
            }}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={saving || !formData.name}
            className="flex-1 bg-gold-500 text-deepblack font-bold py-3 rounded-lg hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/jobs"
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
