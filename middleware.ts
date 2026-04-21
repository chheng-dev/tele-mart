import { NextRequest, NextResponse } from "next/server";

const AUTH_SCREEN_PREFIXES = ["/login", "/signup", "/register"];
const PUBLIC_API_PREFIXES = ["/api/telegram/webhook", "/api/auth"];
const ALWAYS_SKIP_PREFIXES = ["/api", "/_next", "/_static"];
const SESSION_COOKIE_NAMES = ["better-auth.session_token", "__Secure-better-auth.session_token"];

function hasPrefix(pathname: string, prefixes: readonly string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isAuthScreenPath(pathname: string) {
  return AUTH_SCREEN_PREFIXES.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function isApiPath(pathname: string) {
  return hasPrefix(pathname, ALWAYS_SKIP_PREFIXES);
}

function unauthorizatedJson() {
  return NextResponse.json({ error: "Unauthorized", code: "UNAUTHORIZED" }, { status: 401 });
}

function hasSessionCookie(request: NextRequest) {
  return SESSION_COOKIE_NAMES.some((name) => !!request.cookies.get(name)?.value);
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (hasPrefix(pathname, ALWAYS_SKIP_PREFIXES)) {
    return NextResponse.next();
  }

  if (hasPrefix(pathname, PUBLIC_API_PREFIXES)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.next();
  }

  const loggedIn = hasSessionCookie(request);

  if (isAuthScreenPath(pathname)) {
    if (loggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!loggedIn) {
    if (isApiPath(pathname)) {
      return unauthorizatedJson();
    }
    return redirectToLogin(request, pathname);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
