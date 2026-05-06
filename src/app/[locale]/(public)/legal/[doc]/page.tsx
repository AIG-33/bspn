import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { LegalDocument } from "./legal-document";

const DOCS = ["privacy", "terms"] as const;
type LegalDoc = (typeof DOCS)[number];

export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}): Promise<Metadata> {
  const { locale, doc } = await params;

  if (!DOCS.includes(doc as LegalDoc)) return {};

  const t = await getTranslations({
    locale,
    namespace: `legal.${doc}`,
  });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function LegalDocPage({
  params,
}: {
  params: Promise<{ locale: string; doc: string }>;
}) {
  const { doc } = await params;

  if (!DOCS.includes(doc as LegalDoc)) {
    notFound();
  }

  return <LegalDocument doc={doc as LegalDoc} />;
}
