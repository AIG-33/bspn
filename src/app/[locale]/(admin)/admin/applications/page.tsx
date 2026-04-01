import { getMemberApplications } from "@/lib/queries/members";
import { ApplicationsClient } from "./applications-client";

export default async function ApplicationsPage() {
  const applications = await getMemberApplications();
  return <ApplicationsClient initialData={applications} />;
}
