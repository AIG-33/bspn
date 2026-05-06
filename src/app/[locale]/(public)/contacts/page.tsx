import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ContactBlock {
  icon: LucideIcon;
  titleKey: "officeTitle" | "phoneTitle" | "emailTitle" | "hoursTitle";
  valueKey: "address" | "phone" | "email" | "hours";
  href?: (val: string) => string;
}

const BLOCKS: ContactBlock[] = [
  { icon: MapPin, titleKey: "officeTitle", valueKey: "address" },
  {
    icon: Phone,
    titleKey: "phoneTitle",
    valueKey: "phone",
    href: (v) => `tel:${v.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    titleKey: "emailTitle",
    valueKey: "email",
    href: (v) => `mailto:${v}`,
  },
  { icon: Clock, titleKey: "hoursTitle", valueKey: "hours" },
];

export default function ContactsPage() {
  const t = useTranslations("page.contacts");
  const tSite = useTranslations("site");

  const valueOf = (
    key: ContactBlock["valueKey"]
  ): string => {
    if (key === "address" || key === "phone" || key === "email") {
      return tSite(key);
    }
    return t(key);
  };

  return (
    <>
      <PageHeader
        title={t("title")}
        description={t("description")}
        variant="aurora"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {BLOCKS.map(({ icon: Icon, titleKey, valueKey, href }) => {
            const value = valueOf(valueKey);
            const content = (
              <>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-base font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(titleKey)}
                </h3>
                <p className="mt-2 text-base font-medium leading-relaxed text-foreground">
                  {value}
                </p>
              </>
            );

            return href ? (
              <a
                key={titleKey}
                href={href(value)}
                className="block transition-transform hover:-translate-y-1"
              >
                <GlassCard hoverable className="h-full p-6 sm:p-7">
                  {content}
                </GlassCard>
              </a>
            ) : (
              <GlassCard key={titleKey} className="h-full p-6 sm:p-7">
                {content}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </>
  );
}
