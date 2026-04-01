"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  Landmark,
  Scale,
  UserSearch,
  Lock,
  HelpCircle,
  Globe,
} from "lucide-react";

const directions = [
  {
    key: "consumerProtection" as const,
    href: "/consumer-protection",
    icon: ShieldAlert,
    membersOnly: true,
  },
  {
    key: "advocacy" as const,
    href: "/advocacy",
    icon: Landmark,
    membersOnly: false,
  },
  {
    key: "courtPractice" as const,
    href: "/court-practice",
    icon: Scale,
    membersOnly: false,
  },
  {
    key: "experts" as const,
    href: "/experts",
    icon: UserSearch,
    membersOnly: false,
  },
  {
    key: "dataProtection" as const,
    href: "/data-protection",
    icon: Lock,
    membersOnly: true,
  },
  {
    key: "faq" as const,
    href: "/faq",
    icon: HelpCircle,
    membersOnly: false,
  },
  {
    key: "international" as const,
    href: "/international",
    icon: Globe,
    membersOnly: false,
  },
];

export function DirectionsSection() {
  const t = useTranslations("directions");

  return (
    <section className="bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {directions.map(({ key, href, icon: Icon, membersOnly }) => (
            <Link key={key} href={href}>
              <Card className="group h-full transition-all hover:shadow-md hover:-translate-y-0.5">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-sm font-semibold leading-snug">
                      {t(key)}
                    </h3>
                    <Badge
                      variant={membersOnly ? "secondary" : "outline"}
                      className="mt-2 text-xs"
                    >
                      {membersOnly ? (
                        <>
                          <Lock className="mr-1 h-3 w-3" />
                          {t("membersOnly")}
                        </>
                      ) : (
                        t("openAccess")
                      )}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
