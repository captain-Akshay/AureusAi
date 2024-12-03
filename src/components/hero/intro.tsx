"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundLines } from "../ui/background-lines";
import { Cover } from "../ui/cover";

function Intro() {
  return (
    <>
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 bg-gradient-to-b from-background dark:via-purple-950 via-purple-300 to-background">
        <motion.div
          className="max-w-2xl space-y-6 text-center"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative font-bold tracking-tight">
            Quickly craft clips designed to go <Cover>viral.</Cover>
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Your ultimate solution for AI voiceovers, captivating subtitles,
            enhanced gameplay, and beyond.
          </p>
          <Link
            href="#_"
            className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group"
          >
            <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-white opacity-[3%]"></span>
            <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-100 group-hover:-translate-x-8"></span>
            <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-gray-900">
              Get Started
            </span>
            <span className="absolute inset-0 border-2 border-white rounded-full"></span>
          </Link>
        </motion.div>
      </BackgroundLines>
    </>
  );
}

export default Intro;
