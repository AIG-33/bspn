import { getAllCourtCases } from "@/lib/queries/court-cases";
import { AdminCourtPracticeClient } from "./court-practice-client";

export default async function AdminCourtPracticePage() {
  const cases = await getAllCourtCases();
  return <AdminCourtPracticeClient initialData={cases} />;
}
