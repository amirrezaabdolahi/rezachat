import { NextResponse } from "next/server";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // اجازه بده کاربر روی /auth باشه
    if (pathname.startsWith("/auth")) {
        return NextResponse.next();
    }

    const token = request.cookies.get("Token")?.value;

    // اگر توکن نیست → redirect به /auth
    if (!token) {
        return NextResponse.redirect(
            new URL("/auth", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};
