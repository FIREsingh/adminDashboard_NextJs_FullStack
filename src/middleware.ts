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

//================================================
// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
// };

// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request });
//   const url = request.nextUrl;

//   // Redirect to dashboard if the user is already authenticated
//   // and trying to access sign-in, sign-up, or home page
//   if (
//     token &&
//     (url.pathname.startsWith("/login") ||
//       url.pathname.startsWith("/register") ||
//       url.pathname.startsWith("/verifyOtp") ||
//       url.pathname === "/")
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   if (!token && url.pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }
