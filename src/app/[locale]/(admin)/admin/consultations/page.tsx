"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { MessageSquare } from "lucide-react";

export default function Page() {
  return <AdminStub icon={MessageSquare} titleKey="consultations" />;
}
