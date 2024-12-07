"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";
import { MultiStepLoader } from "../ui/multi-step-loader";
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
export default function VideoSplitScreen() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };
  const { toast } = useToast();
  const session = useSession();
  const username = session.data?.user?.email;
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length < 2) {
      toast({
        title: "You think we are moron or you are moron?",
        description: "Are you sure you want to upload less than 2 videos?",
        variant: "destructive",
      });
      return;
    }
    if (files.length > 2) {
      toast({
        title: "You think we are moron or you are moron?",
        description: "Are you sure you want to upload more than 2 videos?",
        variant: "destructive",
      });
      return;
    }
    if (!username) {
      toast({
        title: "Maybe you are not logged in",
        description: "Please refresh the page and login again",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("video1", files[0]);
    formData.append("video2", files[1]);
    formData.append("method", "split_screen_video");
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
    <div className="max-w-md mx-auto p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <FileUpload onChange={handleFileUpload} />
        </div>
        <Button type="submit" disabled={isUploading} className="w-full mt-4">
          {isUploading ? "Queueing..." : "Queue Split Screen Video"}
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
