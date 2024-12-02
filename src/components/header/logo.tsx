"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

function Logo() {
  const { theme } = useTheme();
  return (
    <div>
      {theme == "light" ? (
        <Image alt="logo" src={"/logo-light.png"} width={300} height={150} />
      ) : (
        <Image alt="logo" src={"/logo-dark.png"} width={300} height={150} />
      )}
    </div>
  );
}

export default Logo;
