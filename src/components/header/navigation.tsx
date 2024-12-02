"use client";

import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const features: { title: string; href: string; description: string }[] = [
  {
    title: "Ai-voiceover",
    href: "/docs/primitives/alert-dialog",
    description:
      "An AI powered service in which you can generate human-like voice from script",
  },
  {
    title: "Video Generation",
    href: "/docs/primitives/hover-card",
    description: "Create full viral clip for any social media clip",
  },
  {
    title: "Youtube Thumbnail",
    href: "/docs/primitives/progress",
    description: "Generate youtube thumbnail based on you provided image",
  },
  {
    title: "Youtube video downloader",
    href: "/docs/primitives/scroll-area",
    description: "Download any youtube video",
  },
  {
    title: "Automation for instagram creator",
    href: "/docs/primitives/tabs",
    description: "An automation workflow for instagram account",
  },
  {
    title: "Automation for youtube creator",
    href: "/docs/primitives/tooltip",
    description: "An automation workflow for youtube account",
  },
];

export default function Navigation() {
  const { theme } = useTheme();
  return (
    <NavigationMenu className="z-10">
      <NavigationMenuList className="z-10">
        <NavigationMenuItem className="z-10">
          <NavigationMenuTrigger>Automations</NavigationMenuTrigger>
          <NavigationMenuContent className="z-10">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] z-10">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {theme == "light" ? (
                      <Icons.logoLight className="h-12 w-12" />
                    ) : (
                      <Icons.logoDark className="h-12 w-12" />
                    )}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Aureus Ai
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Easily create viral shorts, reels, statuses, and more in
                      no time!
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Instagram">
                Automate your <strong>Instagram</strong> account management to
                schedule posts, engage with followers, and track performance
                effortlessly.
              </ListItem>
              <ListItem href="/docs/installation" title="Tiktok">
                Take control of your <strong>TikTok </strong>account with
                automated posting, interaction, and analytics to boost your
                content reach.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Youtube">
                Streamline your <strong>YouTube</strong> account with automation
                for consistent uploads, viewer engagement, and performance
                tracking.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {features.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
