"use client";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Icons } from "../icons";
const features: Feature[] = [
  {
    title: "Blog",
    description:
      "Read the latest news and product updates from the Aureus Ai Blog.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className="inline-flex shrink-0 mb-4 text-4xl group-hover/community-box:text-purple-400 md:text-5xl"
        role="icon"
      >
        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
        <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
        <line x1="9" y1="9" x2="10" y2="9"></line>
        <line x1="9" y1="13" x2="15" y2="13"></line>
        <line x1="9" y1="17" x2="15" y2="17"></line>
      </svg>
    ),
    link: "https://AureusAi.com/blog",
    linkDescription: "Read",
  },
  {
    title: "Discord",
    description:
      "Join our Discord community to chat with other developers and the Aureus Ai team.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className="inline-flex shrink-0 mb-4 text-4xl group-hover/community-box:text-purple-400 md:text-5xl"
        role="icon"
      >
        <circle cx="9" cy="12" r="1"></circle>
        <circle cx="15" cy="12" r="1"></circle>
        <path d="M7.5 7.5c3.5 -1 5.5 -1 9 0"></path>
        <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
        <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5"></path>
        <path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5"></path>
      </svg>
    ),
    link: "https://AureusAi.com/discord",
    linkDescription: "Join",
  },
  {
    title: "Twitter",
    description:
      "Follow us on Twitter to stay up to date with the latest news from Aureus Ai.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className="inline-flex shrink-0 mb-4 text-4xl group-hover/community-box:text-purple-400 md:text-5xl"
        role="icon"
      >
        <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"></path>
      </svg>
    ),
    link: "https://twitter.com/AureusAi",
    linkDescription: "Follow",
  },
  {
    title: "Github",
    description: "You can view the projects on our Github page.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        className="inline-flex shrink-0 mb-4 text-4xl group-hover/community-box:text-purple-400 md:text-5xl"
        role="icon"
      >
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
      </svg>
    ),
    link: "https://github.com/AureusAi",
    linkDescription: "View",
  },
];
function Card(props: Feature) {
  return (
    <div className="group/community-box flex flex-col items-center p-6 md:p-8 bg-white/5 transition rounded-lg first:rounded-t-3xl last:rounded-b-3xl md:rounded-lg md:first:rounded-t-lg md:last:rounded-b-lg lg:first:rounded-t-lg lg:last:rounded-b-lg lg:first:!rounded-l-4xl lg:last:!rounded-r-4xl hover:scale-[1.02] hover:bg-white/10">
      {props.icon}
      <h4 className="font-display text-xl md:text-2xl">{props.title}</h4>
      <p className="mb-6 mt-2 opacity-40">{props.description}</p>
      <Link
        target="_blank"
        className="group/link-new inline-flex cursor-pointer items-center transition gap-1 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-zinc-50 bg-white/5 hover:bg-purple-400 hover:text-purple-950 disabled:bg-white/5 disabled:text-zinc-50 mt-auto group-hover/community-box:bg-purple-400 group-hover/community-box:text-purple-950"
        href={props.link}
      >
        <span>{props.linkDescription}</span>
        <Icons.link />
      </Link>
    </div>
  );
}

function FeatureCard() {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div
      ref={ref}
      className="p-20 bg-gradient-to-b from-background dark:from-black dark:via-purple-950 via-purple-300 to-background"
    >
      <div className="mt-10 grid gap-2 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
        {features.map((item, index) => (
          <motion.div
            key={index}
            custom={index} // Pass index to variants
            initial="hidden"
            animate={controls} // Animate based on `inView`
            variants={cardVariants}
          >
            <Card
              icon={item.icon}
              description={item.description}
              link={item.link}
              linkDescription={item.linkDescription}
              title={item.title}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default FeatureCard;
