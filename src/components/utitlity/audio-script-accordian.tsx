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
import { useEffect, useState } from "react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  src: string;
}

const tracks: Track[] = [
  {
    id: "1",
    title: "Serene Mornings",
    artist: "Ambient Sounds",
    duration: "3:45",
    src: "/path/to/track1.mp3",
  },
  {
    id: "2",
    title: "Urban Rhythms",
    artist: "City Beats",
    duration: "4:12",
    src: "/audiotracks/song.mp3",
  },
  {
    id: "3",
    title: "Ocean Waves",
    artist: "Nature Sounds",
    duration: "5:30",
    src: "/path/to/track3.mp3",
  },
];

const AudioPlaylist = ({ selectedTrack, setSelectedTrack }) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlay = (track: Track) => {
    if (playingTrack === track.id) {
      // Pause the currently playing track
      audio?.pause();
      setPlayingTrack(null);
    } else {
      // Play a new track
      if (audio) {
        audio.pause(); // Pause any currently playing audio
        // audio.removeEventListener("canplay", handleCanPlay); // Cleanup previous listeners
        // audio.removeEventListener("ended", handleAudioEnded);
      }

      const newAudio = new Audio("http://localhost:3000" + track.src);
      setAudio(newAudio);
      setPlayingTrack(track.id);

      const handleCanPlay = () => {
        newAudio.play().catch((err) => {
          console.error("Failed to play audio:", err);
        });
      };

      const handleAudioEnded = () => {
        setPlayingTrack(null);
      };

      newAudio.addEventListener("canplay", handleCanPlay);
      newAudio.addEventListener("ended", handleAudioEnded);

      // Debug information
      console.log("Playing track:", track.title);
    }
  };
  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      audio?.pause();
      setAudio(null);
    };
  }, [audio]);

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="gameplay">
        <AccordionTrigger className="text-xl font-semibold py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
          Narrator Audios
        </AccordionTrigger>
        <AccordionContent className="mt-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="space-y-3">
            {tracks.map((track) => (
              <div
                key={track.id}
                className={clsx(
                  "flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200",
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
                  className="mr-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay(track);
                  }}
                >
                  {playingTrack === track.id ? <Pause /> : <Play />}
                </Button>

                {/* Track Info */}
                <div className="flex-grow">
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {track.artist}
                  </div>
                </div>

                {/* Track Duration */}
                <div className="text-sm text-muted-foreground mr-2">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default AudioPlaylist;
