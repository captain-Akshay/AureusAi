"use client";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect } from "react";
import GettingStarted from "./getting-started";
import Logo from "./logo";
import Navigation from "./navigation";
function NavbarHeader() {
  useEffect(() => {
    async function userBase() {
      try {
        await axios.get("/api/new-user").then((res) => {
          console.log(res);
        });
      } catch (error) {
        console.error("Failed", error);
      }
    }
    userBase();
  }, []);
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
