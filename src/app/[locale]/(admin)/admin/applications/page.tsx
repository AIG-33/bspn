"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { Shield } from "lucide-react";

export default function Page() {
  return <AdminStub icon={Shield} titleKey="applications" />;
}
