import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const PUBLIC_PATHS = ["/login", "/register", "/api/auth"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_PATHS.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/api/telegram/webhook") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_static") ||
    pathname == "/"
  ) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// apply to all routes (you can narrow this)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
