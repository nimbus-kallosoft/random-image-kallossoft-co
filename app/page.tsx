"use client";

import { useState, useEffect } from "react";
import { Loader2, RefreshCw } from "lucide-react";

interface RandomImageResponse {
  imageUrl: string;
  photographer: string;
}

export default function Home() {
  const [imageData, setImageData] = useState<RandomImageResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomImage = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Add cache-busting parameter
      const response = await fetch(`/api/random-image?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      
      const data: RandomImageResponse = await response.json();
      setImageData(data);
    } catch (err) {
      setError("Failed to load image. Please try again.");
      console.error("Error fetching image:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Random Image Gallery
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Discover beautiful images from Unsplash
          </p>
        </div>

        {/* Image Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Image Display */}
          <div className="relative aspect-[4/3] bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-slate-400 animate-spin" />
                <p className="text-slate-500 dark:text-slate-400">Loading image...</p>
              </div>
            ) : error ? (
              <div className="text-center px-4">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={fetchRandomImage}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : imageData ? (
              <img
                src={imageData.imageUrl}
                alt="Random gallery image"
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {/* Footer */}
          <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              {imageData && !loading && (
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Photo by{" "}
                  <span className="font-medium text-slate-700 dark:text-slate-200">
                    {imageData.photographer}
                  </span>
                  {" "}on{" "}
                  <a
                    href="https://unsplash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Unsplash
                  </a>
                </p>
              )}
            </div>

            <button
              onClick={fetchRandomImage}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Loading..." : "Show Another Image"}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-8">
          Images provided by{" "}
          <a
            href="https://unsplash.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Unsplash
          </a>
        </p>
      </main>
    </div>
  );
}
