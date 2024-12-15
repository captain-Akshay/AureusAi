"use client";
import { ModeToggle } from "../ui/mode-toggle";
import UserAvatar from "./user-avatar";

function GettingStarted() {
  return (
    <div className="flex flex-row gap-4 justify-center items-center z-10">
      <UserAvatar />
      <ModeToggle className={""} />
    </div>
  );
}

export default GettingStarted;
