import { getAllAdvocacyDirections, getAllAdvocacyInitiatives } from "@/lib/queries/advocacy";
import { AdminAdvocacyClient } from "./advocacy-client";

export default async function AdminAdvocacyPage() {
  const [directions, initiatives] = await Promise.all([
    getAllAdvocacyDirections(),
    getAllAdvocacyInitiatives(),
  ]);
  return <AdminAdvocacyClient initialDirections={directions} initialInitiatives={initiatives} />;
}
