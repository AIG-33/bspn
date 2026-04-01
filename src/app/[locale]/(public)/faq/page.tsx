import { PageHeader } from "@/components/sections/page-header";
import { getFaqItems } from "@/lib/queries/faq";
import { FaqClient } from "./faq-client";

export default async function FaqPage() {
  const faqItems = await getFaqItems();

  return (
    <>
      <PageHeader
        title="Вопросы и ответы"
        description="База знаний для предпринимателей — ответы на самые частые вопросы о ведении бизнеса в Беларуси"
      />
      <FaqClient initialData={faqItems} />
    </>
  );
}
