"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { FileText } from "lucide-react";

export default function Page() {
  return <AdminStub icon={FileText} titleKey="documents" />;
}
