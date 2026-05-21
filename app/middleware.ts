import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const protectedPaths = ["/cuenta", "/ver"];
  const isProtected = protectedPaths.some((p) => request.nextUrl.pathname.startsWith(p));

  if (!isProtected) return NextResponse.next();

  // Comprobar cookie de sesión de Supabase (la verificación real ocurre en el server component)
  const projectRef = "otsbpiukzftacmvmkajy";
  const hasSession =
    request.cookies.has(`sb-${projectRef}-auth-token`) ||
    request.cookies.has(`sb-${projectRef}-auth-token.0`) ||
    request.cookies.has(`sb-access-token`);

  if (!hasSession) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|fotos).*)"],
};
