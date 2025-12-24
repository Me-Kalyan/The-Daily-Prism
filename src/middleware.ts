import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "te"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Ignore system files (images, api, next.js internals)
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.startsWith("/static") ||
        pathname.includes(".") // ignores favicon.ico, images, etc.
    ) {
        return NextResponse.next();
    }

    // 2. Check if the URL already has a language (e.g. /en/politics)
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return NextResponse.next();

    // 3. If missing language, redirect to default (e.g. /politics -> /en/politics)
    const locale = defaultLocale;
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Preserve query parameters (e.g. ?search=modi)
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
