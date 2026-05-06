"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { UserCheck } from "lucide-react";

export default function Page() {
  return <AdminStub icon={UserCheck} titleKey="experts" />;
}
