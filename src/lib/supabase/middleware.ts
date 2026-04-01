import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Extract locale-stripped path for route matching
  const strippedPath = pathname.replace(/^\/(ru|en)/, "") || "/";

  const isProtectedRoute =
    strippedPath.startsWith("/cabinet") || strippedPath.startsWith("/admin");
  const isAdminRoute = strippedPath.startsWith("/admin");
  const isAuthRoute =
    strippedPath.startsWith("/login") ||
    strippedPath.startsWith("/register") ||
    strippedPath.startsWith("/forgot-password");

  const locale = pathname.match(/^\/(ru|en)/)?.[1] || "ru";

  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    const role = profile?.role;
    if (role !== "admin" && role !== "superadmin") {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/cabinet`;
      return NextResponse.redirect(url);
    }
  }

  if (isAuthRoute && user) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/cabinet`;
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
