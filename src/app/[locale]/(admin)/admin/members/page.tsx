"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { Users } from "lucide-react";

export default function Page() {
  return <AdminStub icon={Users} titleKey="members" />;
}
