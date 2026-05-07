"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

type Role = "member" | "admin" | "superadmin";

interface AuthContextType {
  user: User | null;
  role: Role | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isAdmin: false,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
        setRole((data?.role as Role) ?? "member");
      } else {
        setRole(null);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const isAdmin = role === "admin" || role === "superadmin";

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("[auth] signOut failed", err);
    }
    // Navigate to the localized homepage with a hard reload — this resets
    // every React state slice (including the auth context and any open
    // dropdowns) without forcing a re-render mid-logout, which would
    // unmount the trigger of an open menu and break BaseUI focus restoration.
    const match =
      typeof window !== "undefined"
        ? window.location.pathname.match(/^\/(ru|en|zh)/)
        : null;
    const locale = match?.[1] ?? "ru";
    window.location.replace(`/${locale}`);
  };

  return (
    <AuthContext.Provider value={{ user, role, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  return useContext(AuthContext);
}
