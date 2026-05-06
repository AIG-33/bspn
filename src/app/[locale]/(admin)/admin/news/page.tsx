"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { Newspaper } from "lucide-react";

export default function Page() {
  return <AdminStub icon={Newspaper} titleKey="news" />;
}
