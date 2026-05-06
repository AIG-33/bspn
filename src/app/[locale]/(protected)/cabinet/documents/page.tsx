"use client";

import { FileText } from "lucide-react";
import { CabinetStub } from "@/components/sections/cabinet-stub";

export default function DocumentsPage() {
  return <CabinetStub icon={FileText} titleKey="menuDocuments" />;
}
