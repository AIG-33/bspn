"use client";

import { useUser } from "@/components/auth-provider";
import { Link } from "@/i18n/navigation";
import { Settings } from "lucide-react";

export function AdminEditBar({
  label,
  adminHref,
}: {
  label: string;
  adminHref: string;
}) {
  const { isAdmin, loading } = useUser();

  if (loading || !isAdmin) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-primary/20 bg-background/95 px-4 py-2.5 shadow-lg backdrop-blur-sm">
      <Settings className="h-4 w-4 text-primary" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <Link
        href={adminHref}
        className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Редактировать
      </Link>
    </div>
  );
}
