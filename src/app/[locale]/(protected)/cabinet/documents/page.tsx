import { getDocuments } from "@/lib/queries/documents";
import { DocumentsClient } from "./documents-client";

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return <DocumentsClient initialData={documents} />;
}
