"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Track {
  id: string;
  title: string;
}

const tracks: Track[] = [
  {
    id: "1",
    title: "Aaron Dreschner",
  },
  {
    id: "2",
    title: "Asya Anara",
  },
  {
    id: "3",
    title: "Sofia Hellen",
  },
  {
    id: "4",
    title: "Viktor Menelaos",
  },
  {
    id: "5",
    title: "Xavier Hayasaka",
  },
];

const AudioPlaylist = ({
  selectedTrack,
  setSelectedTrack,
}: {
  selectedTrack: string | null;
  setSelectedTrack: (track: string) => void;
}) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (track: Track) => {
    // If clicking the same track that's currently playing
    if (playingTrack === track.id) {
      if (audioRef.current) {
        // If audio is playing, pause it
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setPlayingTrack(null);
        } else {
          // If audio is paused, resume playing
          audioRef.current.play().catch((err) => {
            console.error("Failed to play audio:", err);
          });
          setPlayingTrack(track.id);
        }
      }
    } else {
      // Stop and clear any existing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create and play new audio
      const newAudio = new Audio(
        `http://localhost:3000/speakers/${track.title}.wav`
      );

      newAudio.addEventListener("canplay", () => {
        newAudio.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      });

      newAudio.addEventListener("ended", () => {
        setPlayingTrack(null);
      });

      // Set the new audio reference
      audioRef.current = newAudio;
      setPlayingTrack(track.id);
      setSelectedTrack(track.title);
    }
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="gameplay"
          className="border border-gray-200 rounded-lg"
        >
          <AccordionTrigger
            className="text-xl font-semibold py-3 px-4 
            bg-gradient-to-r from-blue-500 to-purple-500 
            text-white rounded-lg 
            hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600
            transition-colors duration-300"
          >
            Narrator Audios
          </AccordionTrigger>

          <AccordionContent
            className="mt-2 bg-white dark:bg-gray-800 
            p-4 rounded-b-lg shadow-md"
          >
            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={clsx(
                    "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 group",
                    selectedTrack === track.title
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  )}
                  onClick={() => setSelectedTrack(track.title)}
                >
                  {/* Play/Pause Button */}
                  <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    className={clsx(
                      "mr-4 transition-colors duration-200",
                      selectedTrack === track.title
                        ? "hover:bg-blue-600"
                        : "hover:bg-blue-500"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay(track);
                    }}
                  >
                    {playingTrack === track.id ? (
                      <Pause
                        className={
                          selectedTrack === track.title
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      />
                    ) : (
                      <Play
                        className={
                          selectedTrack === track.title
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }
                      />
                    )}
                  </Button>

                  {/* Track Info */}
                  <div className="flex-grow">
                    <div
                      className={clsx(
                        "font-medium transition-colors duration-200",
                        selectedTrack === track.title
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-200"
                      )}
                    >
                      {track.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AudioPlaylist;
