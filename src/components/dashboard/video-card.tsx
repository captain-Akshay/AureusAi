import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Download, Loader2 } from "lucide-react";
export const VideoCard: React.FC<{
  video: MediaTask;
}> = ({ video }) => {
  const handleDownload = async (video_id: string) => {
    try {
      const response = await axios.get(
        `/api/download?taskId=${video_id}&extension=final.wav`
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
          <p>{video.name}</p>
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

          <p>{video.name}</p>
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
