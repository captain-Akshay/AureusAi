import { Metadata } from "next";
import Link from "next/link";

import LogoDark from "@/assets/logo-dark";
import { buttonVariants } from "@/components/ui/button";
import { UserAuthForm } from "@/components/ui/user-auth-form";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
};

export default function AuthenticationPage({ login }: { login: boolean }) {
  return !login ? (
    <>
      <div className=" w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative w-screen hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Link
            href="/signin"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            Login
          </Link>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div
              className="absolute inset-0 bg-zinc-900"
              style={{
                backgroundImage: "url(/signup-bg.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <LogoDark width={"50px"} height={"50px"} />
              Aureus Ai Inc
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This is the place where you begin journey for expected
                  financial growth without any code and some motivational lines
                  for you to use this software.&rdquo;
                </p>
                <footer className="text-sm">Ak</footer>
              </blockquote>
            </div>
          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account
                </p>
              </div>
              <UserAuthForm login />
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className=" w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative w-screen hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <div className="lg:p-8">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute left-4 top-4 md:left-8 md:top-8"
              )}
            >
              Signup
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                <p className="text-sm text-muted-foreground">
                  Enter your registered email & password
                </p>
              </div>
              <UserAuthForm login />
            </div>
          </div>
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
            <div
              className="absolute inset-0 bg-zinc-900"
              style={{
                backgroundImage: "url(/signin-bg.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <LogoDark width={"50px"} height={"50px"} />
              Aureus Ai Inc
            </div>

            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;You know how awesome this is right? that why you are
                  still here for the cake right!!!!&rdquo;
                </p>
                <footer className="text-sm">Ak</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
