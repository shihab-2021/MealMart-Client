import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login", "/register"];

const roleBasedPrivateRoutes = {
  customer: [/^\/dashboard\/customer/],
  provider: [/^\/dashboard\/provider/],
  admin: [/^\/dashboard\/admin/],
  any: [/^\/dashboard\/editProfile/],
};

// Secret for JWT token verification (NextAuth)
const SECRET = process.env.NEXTAUTH_SECRET;

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get session from NextAuth (JWT token stored in cookies)
  const session = await getToken({ req: request, secret: SECRET });

  // If no session, redirect to login unless accessing public routes
  if (!session) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // Extract user role from session
  const userRole = session.role as keyof typeof roleBasedPrivateRoutes;

  // Check if role exists in our defined private routes
  if (userRole && roleBasedPrivateRoutes[userRole]) {
    const allowedRoutes = roleBasedPrivateRoutes[userRole];

    // Allow access if pathname matches allowed routes
    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
    if (session && pathname === "/dashboard/editProfile") {
      return NextResponse.next();
    }
  }

  // If the user is authenticated but not authorized, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
};

// Match routes for middleware execution
export const config = {
  matcher: [
    // "/login",
    "/dashboard/:page*",
    "/create-shop",
    "/customer",
    "/customer/:path*",
    "/provider",
    "/provider/:path*",
  ],
};
