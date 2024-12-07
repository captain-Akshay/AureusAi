"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getName } from "@/utils/text";
import clsx from "clsx";
import { useEffect, useState } from "react";

function GameplayAccordion({ videoName, setVideoName }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("/gameplay_metadata.json");
        const data = await response.json();
        setVideos(data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    }
    fetchVideos();
  }, []);
  return (
    <Accordion type="single" collapsible className="w-full max-w-lg mx-auto">
      <AccordionItem value="gameplay">
        <AccordionTrigger className="text-xl font-semibold py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
          Gameplay Videos
        </AccordionTrigger>
        <AccordionContent className="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {videos.map((video) => (
              <div
                key={video}
                onClick={() => setVideoName(video)}
                className={clsx(
                  "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200",
                  videoName === video
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                <img
                  src={`/gameplay/${video}.gif`}
                  alt={`${video} gif`}
                  className="w-12 h-12 rounded-lg"
                />
                <span className="ml-3 text-lg font-medium">
                  {getName(video)}
                </span>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default GameplayAccordion;
