"use client";
import { motion } from "framer-motion";
import GettingStarted from "./getting-started";
import Logo from "./logo";
import Navigation from "./navigation";
function NavbarHeader() {
  return (
    <motion.header
      className="flex flex-row justify-between p-4 w-full z-10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <Logo />
      <Navigation />
      <GettingStarted />
    </motion.header>
  );
}

export default NavbarHeader;
