import { getAllMembers } from "@/lib/queries/members";
import { MembersClient } from "./members-client";

export default async function MembersPage() {
  const members = await getAllMembers();
  return <MembersClient initialData={members} />;
}
