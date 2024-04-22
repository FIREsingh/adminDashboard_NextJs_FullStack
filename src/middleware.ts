import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const publicPath =
    currentPath == "/login" ||
    currentPath == "/register" ||
    currentPath == "/verifyOtp";

  //jwt token
  const token = request.cookies.get("token")?.value || "";

  //if you have logged in, cant access public path
  if (publicPath && token)
    return NextResponse.redirect(new URL("/", request.url));

  if (!publicPath && !token)
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/register", "/verifyOtp", "/users"],
};
