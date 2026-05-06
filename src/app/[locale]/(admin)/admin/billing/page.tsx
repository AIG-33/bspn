"use client";

import { AdminStub } from "@/components/sections/admin-stub";
import { CreditCard } from "lucide-react";

export default function Page() {
  return <AdminStub icon={CreditCard} titleKey="billing" />;
}
