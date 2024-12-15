"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { loadingStates } from "@/utils/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FileUpload } from "../ui/file-upload";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { MultiStepLoader } from "../ui/multi-step-loader";
import { Separator } from "../ui/separator";
import GameplayAccordion from "./gameplay-accordian";

export default function OneVideoSplitScreen() {
  const [projectName, setProjectName] = useState("Untitled Project");
  const [files, setFiles] = useState<File[]>([]);
  const [gameplayName, setGameplayName] = useState("");
  const handleFileUpload = (files: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...files]);
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

    formData.append("project_name", projectName);
    formData.append("gameplay", gameplayName);
    formData.append("video1", files[0]);
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
    <>
      <div className="p-6 rounded-lg shadow-md space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              type="project-name"
              id="project-name"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
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
      </div>
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={isUploading}
        duration={2000}
      />
    </>
  );
}
