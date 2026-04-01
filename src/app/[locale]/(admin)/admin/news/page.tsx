import { getAllNews } from "@/lib/queries/news";
import { AdminNewsClient } from "./news-client";

export default async function AdminNewsPage() {
  const news = await getAllNews();
  return <AdminNewsClient initialData={news} />;
}
