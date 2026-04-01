import { PageHeader } from "@/components/sections/page-header";
import { getExperts } from "@/lib/queries/experts";
import { ExpertsClient } from "./experts-client";
import { AdminEditBar } from "@/components/admin-edit-bar";

export default async function ExpertsPage() {
  const experts = await getExperts();

  return (
    <>
      <PageHeader
        title="Эксперты БСПН"
        description="Команда квалифицированных юристов и консультантов — более 150 лет совокупного опыта в защите бизнеса"
      />
      <ExpertsClient initialData={experts} />
      <AdminEditBar label="Эксперты" adminHref="/admin/experts" />
    </>
  );
}
