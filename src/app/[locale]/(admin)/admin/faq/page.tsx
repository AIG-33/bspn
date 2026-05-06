"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { HelpCircle } from "lucide-react";

export default function Page() {
  return <AdminStub icon={HelpCircle} titleKey="faq" />;
}
