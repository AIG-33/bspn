import { PageHeader } from "@/components/sections/page-header";
import { getCourtCases } from "@/lib/queries/court-cases";
import { CourtPracticeClient } from "./court-practice-client";
import { AdminEditBar } from "@/components/admin-edit-bar";

export default async function CourtPracticePage() {
  const cases = await getCourtCases();

  return (
    <>
      <PageHeader
        title="Судебная практика"
        description="Реальные кейсы защиты интересов бизнеса — результаты и прецеденты для ваших решений"
      />
      <CourtPracticeClient initialData={cases} />
      <AdminEditBar label="Судебная практика" adminHref="/admin/court-practice" />
    </>
  );
}
