"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function UserAvatar() {
  const session = useSession();
  const user = session?.data?.user;
  const router = useRouter();
  return user ? (
    <div>
      <Button variant="ghost" onClick={() => router.push("/dashboard")}>
        <div className="flex justify-center flex-row gap-4 items-center">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user?.image} alt={user?.name} />
            <AvatarFallback className="rounded-lg">!?</AvatarFallback>
          </Avatar>
        </div>
      </Button>
    </div>
  ) : (
    <Link href="/signup" className="relative inline-block text-lg group">
      <span
        className={`relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight transition-colors duration-300 ease-out border-2 rounded-lg group-hover:text-white dark:text-gray-200 dark:border-gray-400 text-gray-800 border-gray-900 hover:dark:text-gray-950`}
      >
        <span
          className={`absolute inset-0 w-full h-full px-5 py-3 rounded-lg dark:bg-gray-800 bg-gray-50 `}
        ></span>
        <span
          className={`absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 group-hover:-rotate-180 ease dark:bg-gray-200 bg-gray-900`}
        ></span>
        <span className="relative flex flex-row">Sign Up / Sign In</span>
      </span>
      <span
        className={`absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear rounded-lg group-hover:mb-0 group-hover:mr-0 dark:bg-gray-200 bg-gray-900`}
        data-rounded="rounded-lg"
      ></span>
    </Link>
  );
}

export default UserAvatar;
