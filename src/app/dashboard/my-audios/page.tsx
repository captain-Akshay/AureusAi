"use client";
import Loader from "@/components/ui/loader";
import axios from "axios";
import { useEffect, useState } from "react";
import { VideoCard } from "../my-videos/page";

interface AudioTask {
  id: string;
  status: "processing" | "completed" | "error";
  audioUrl?: string;
}

export default function MyAudioPage() {
  const [audio, setAudio] = useState<AudioTask[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAudio() {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/my-audios");
        setAudio(response.data);
      } catch (error) {
        console.error("Failed to fetch Audio", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAudio();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Audio</h1>
      {audio.length === 0 ? (
        <p>No Audio found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audio.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
