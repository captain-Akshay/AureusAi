"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { Separator } from "../ui/separator";
import GameplayAccordion from "./gameplay-accordian";
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
export default function OneVideoSplitScreen() {
  const [files, setFiles] = useState<File[]>([]);
  const [gameplayName, setGameplayName] = useState("");
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };
  const { toast } = useToast();
  const session = useSession();
  const username = session.data?.user?.email;
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length < 1) {
      toast({
        title: "You think we are moron or you are moron?",
        description: "Are you sure you want to upload less than 1 videos?",
        variant: "destructive",
      });
      return;
    }
    if (files.length > 1) {
      toast({
        title: "You think we are moron or you are moron?",
        description: "Are you sure you want to upload more than 1 videos?",
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
    formData.append("gameplay", gameplayName);
    formData.append("video", files[0]);
    formData.append("method", "one_split_screen_video");
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
    <div className="p-6 rounded-lg shadow-md space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* Submit Button */}
        <div className="flex justify-center mt-4 gap-8">
          <FileUpload onChange={handleFileUpload} />
          <Separator orientation="vertical" className="h-auto" />

          <GameplayAccordion
            videoName={gameplayName}
            setVideoName={setGameplayName}
          />
        </div>
        <Button type="submit" disabled={isUploading} className="w-1/2 mt-8">
          {isUploading ? "Queueing..." : "Queue One Split Screen Video"}
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
