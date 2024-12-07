"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface VideoTask {
  id: string;
  status: "processing" | "completed" | "error";
  videoUrl?: string;
}

export default function MyVideosPage() {
  const [videos, setVideos] = useState<VideoTask[]>([]);
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
    return <div>Loading videos...</div>;
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

const VideoCard: React.FC<{
  video: VideoTask;
}> = ({ video }) => {
  const handleDownload = async (video_id: string) => {
    try {
      const response = await axios.get(
        `/api/download?taskId=${video_id}&extension=final_video.mp4`
      );
      const url = response.data.url;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed", error);
    }
  };
  if (video.status === "processing") {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Processing Video</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-pulse">
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground">
            Video is being processed. This may take a few minutes.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (video.status === "completed") {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Video Ready</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <video src={video.videoUrl} controls className="w-full rounded-lg" />
          <div className="flex justify-between">
            <Button onClick={() => handleDownload(video.id)} className="w-full">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
