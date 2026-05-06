import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/sections/page-header";
import { GlassCard } from "@/components/ui/glass-card";
import { YandexMap } from "@/components/sections/yandex-map";
import { OrganizationCard } from "@/components/sections/organization-card";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BSPN_LAT = 53.885448;
const BSPN_LON = 27.590362;

interface ContactBlock {
  icon: LucideIcon;
  titleKey: "officeTitle" | "phoneTitle" | "emailTitle" | "hoursTitle";
  valueKey: "address" | "phone" | "email" | "hours";
  href?: (val: string) => string;
  accent: string;
}

const BLOCKS: ContactBlock[] = [
  {
    icon: MapPin,
    titleKey: "officeTitle",
    valueKey: "address",
    accent: "from-primary to-[var(--cta)]",
  },
  {
    icon: Phone,
    titleKey: "phoneTitle",
    valueKey: "phone",
    href: (v) => `tel:${v.replace(/\s/g, "")}`,
    accent: "from-[var(--cta)] to-[var(--gold)]",
  },
  {
    icon: Mail,
    titleKey: "emailTitle",
    valueKey: "email",
    href: (v) => `mailto:${v}`,
    accent: "from-[var(--gold)] to-[var(--aurora-2)]",
  },
  {
    icon: Clock,
    titleKey: "hoursTitle",
    valueKey: "hours",
    accent: "from-[var(--aurora-2)] to-primary",
  },
];

export default function ContactsPage() {
  const t = useTranslations("page.contacts");
  const tSite = useTranslations("site");

  const valueOf = (key: ContactBlock["valueKey"]): string => {
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

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BLOCKS.map(({ icon: Icon, titleKey, valueKey, href, accent }) => {
            const value = valueOf(valueKey);
            const content = (
              <GlassCard hoverable className="h-full p-5">
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-md`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
                  {t(titleKey)}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-foreground sm:text-base">
                  {value}
                </p>
              </GlassCard>
            );

            return href ? (
              <a
                key={titleKey}
                href={href(value)}
                className="block transition-transform hover:-translate-y-1"
              >
                {content}
              </a>
            ) : (
              <div key={titleKey}>{content}</div>
            );
          })}
        </div>

        <div className="mt-10">
          <YandexMap lat={BSPN_LAT} lon={BSPN_LON} />
        </div>

        <div className="mt-10">
          <OrganizationCard />
        </div>

        <div className="mt-10">
          <GlassCard variant="strong" className="overflow-hidden p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
                <Send className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold sm:text-xl">
                  {t("writeUs")}
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  <a
                    href={`mailto:${tSite("email")}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {tSite("email")}
                  </a>
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}
