"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import AudioPlaylist from "./audio-script-accordian";
const loadingStates = [
  {
    text: "Let me tell you a story",
  },
  {
    text: "to waste your time",
  },
  {
    text: "so you won't know",
  },
  {
    text: "how slow our system is",
  },
  {
    text: "Adding your video in queue",
  },
  {
    text: "Insulting the workers to work faster",
  },
  {
    text: "This is embarrassing",
  },
  {
    text: "Ah shit, here we go again.",
  },
];
export default function GeneratingAudio() {
  const [text, setText] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const handleTextareaChange = (e) => {
    setText(e.target.value);
  };
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text || text.length < 10) {
      toast({
        title: "Bruh!",
        description: "You seriously need to enter some more text",
        variant: "destructive",
      });
      return;
    }
    const formData = new FormData();
    formData.append("txt", text);
    formData.append("method", "generate_audio");
    setIsUploading(true);

    try {
      const response = await axios.post("/api/request-task", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Nice You are doing good",
        description:
          "Video processing task is queued wait for the result in your download page ",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Maybe we went broke",
        description: "Sorry!",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex justify-center mt-4 gap-8">
          <Textarea
            onChange={handleTextareaChange}
            value={text}
            className="w-96 h-40 mt-4"
            placeholder="Enter your script here"
          />
          <Separator orientation="vertical" className="h-auto" />
          <AudioPlaylist
            selectedTrack={selectedTrack}
            setSelectedTrack={setSelectedTrack}
          />
        </div>
        <Button type="submit" disabled={isUploading} className="w-full mt-4">
          {isUploading ? "Queueing..." : "Queue your script"}
        </Button>
      </form>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isUploading}
        duration={2000}
      />
    </div>
  );
}
