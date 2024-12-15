"use client";
import { VideoCard } from "@/components/dashboard/video-card";
import Loader from "@/components/ui/loader";
import axios from "axios";
import { useEffect, useState } from "react";

export default function MyVideosPage() {
  const [videos, setVideos] = useState<MediaTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/my-videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVideos();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Videos</h1>
      {videos.length === 0 ? (
        <p>No videos found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
