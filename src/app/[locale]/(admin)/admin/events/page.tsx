"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { CalendarDays } from "lucide-react";

export default function Page() {
  return <AdminStub icon={CalendarDays} titleKey="events" />;
}
