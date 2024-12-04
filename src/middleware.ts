import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "./auth";
const protectedRoutes = ["/dashboard"];
export async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(
      new URL("/signin", request.nextUrl.origin).toString()
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
