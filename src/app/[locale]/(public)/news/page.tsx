import { PageHeader } from "@/components/sections/page-header";
import { getNews } from "@/lib/queries/news";
import { NewsClient } from "./news-client";

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <PageHeader
        title="Новости"
        description="Последние новости БСПН, изменения в законодательстве и события делового сообщества Беларуси"
      />
      <NewsClient initialData={news} />
    </>
  );
}
