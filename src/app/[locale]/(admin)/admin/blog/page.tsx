"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { BookOpen } from "lucide-react";

export default function Page() {
  return <AdminStub icon={BookOpen} titleKey="blog" />;
}
