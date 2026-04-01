import { getAllExperts } from "@/lib/queries/experts";
import { AdminExpertsClient } from "./experts-client";

export default async function AdminExpertsPage() {
  const experts = await getAllExperts();
  return <AdminExpertsClient initialData={experts} />;
}
