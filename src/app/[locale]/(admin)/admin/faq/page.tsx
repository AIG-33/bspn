import { getAllFaqItems } from "@/lib/queries/faq";
import { AdminFaqClient } from "./faq-client";

export default async function AdminFaqPage() {
  const items = await getAllFaqItems();
  return <AdminFaqClient initialData={items} />;
}
