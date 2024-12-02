"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

function About() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <>
      <HeroHighlight containerClassName="bg-gradient-to-b from-white dark:from-black to-background">
        <motion.h1
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: [20, -5, 0],
              transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] },
            },
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
        >
          Create your first video in moments. Video clipping made effortless
          <br />
          <Highlight className="text-black dark:text-white">
            give it a try today!
          </Highlight>
        </motion.h1>
        <div ref={ref}></div>
      </HeroHighlight>
    </>
  );
}

export default About;
