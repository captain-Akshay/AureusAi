"use client";
import Card from "@/components/dashboard/cards";
import { Icons } from "@/components/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AudioBased from "@/components/utitlity/audiobased-script";
import FullFunctional from "@/components/utitlity/full-functional";
import GeneratingAudio from "@/components/utitlity/generating-audio";
import OneVideoSplitScreen from "@/components/utitlity/one-split-video";
import VideoSplitScreen from "@/components/utitlity/split-screen-video";
import { useState } from "react";

type ModalType =
  | "split_screen"
  | "one_split"
  | "audio"
  | "full_video"
  | "thumbnail"
  | "audiobased";
export default function Dashboard() {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };
  const dashboardData = [
    {
      Icon: (
        <Icons.dual_split className="h-16 w-16 rotate-90 dark:fill-white fill-gray-700" />
      ),
      Title: "Split Screen Video",
      Description: "Create a split screen video with your own videos.",
      buttonName: "Compile Video",
      onClick: () => openModal("split_screen"),
    },
    {
      Icon: (
        <Icons.one_split className="h-16 w-16 rotate-90 dark:fill-white fill-gray-700" />
      ),
      Title: "One Split Screen Video",
      Description:
        "Upload one video and selete a background visual and create your split screen video.",
      buttonName: "Compile Video",
      onClick: () => openModal("one_split"),
    },
    {
      Icon: (
        <Icons.audio_effect className="h-16 w-16 dark:fill-white fill-gray-700" />
      ),
      Title: "Generate Audio",
      Description:
        "Generate only an audio track for your video based on a script and narator of your choice.",
      buttonName: "Generate Audio",
      onClick: () => openModal("audio"),
    },
    {
      Icon: (
        <Icons.full_effect_video className="h-16 w-16 dark:fill-white fill-gray-700" />
      ),
      Title: "Generate Video with script",
      Description:
        "Create a video with the given script and you have to choose the background visual",
      buttonName: "Generate Audio with Video ",
      onClick: () => openModal("full_video"),
    },
    {
      Icon: (
        <Icons.audiobased className="h-16 w-16 dark:fill-white fill-gray-700" />
      ),
      Title: "Generate Audio based on voice",
      Description:
        "Generate an audio based on the voice you provide, the better the quality you give the better the results",
      buttonName: "Generate Voice",
      onClick: () => openModal("audiobased"),
    },
    {
      Icon: (
        <Icons.thumbnail className="h-16 w-16 dark:fill-white fill-gray-700" />
      ),
      Title: "Generate Thumbnail",
      Description:
        "Create a video with the given script and you have to choose the background visual",
      buttonName: "Generate Audio with Video ",
      onClick: () => openModal("thumbnail"),
    },
  ];
  const modalConfigs = {
    split_screen: {
      title: "Split Screen Video",
      content: <VideoSplitScreen />,
    },
    one_split: {
      title: "One Split Screen Video",
      content: <OneVideoSplitScreen />,
    },
    audio: {
      title: "Generate Audio",
      content: <GeneratingAudio />,
    },
    full_video: {
      title: "Generate Video with script",
      content: <FullFunctional />,
    },
    audiobased: {
      title: "Generate Audio based on script & your voice",
      content: <AudioBased />,
    },
    thumbnail: {
      title: "Generate Thumbnail",
      content: <></>,
    },
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {dashboardData.map((data) => (
        <Card key={data.Title} {...data} />
      ))}
      <Dialog
        open={activeModal !== null}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-fit">
          {activeModal && (
            <>
              <DialogHeader>
                <DialogTitle>{modalConfigs[activeModal].title}</DialogTitle>
              </DialogHeader>
              {modalConfigs[activeModal].content}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
