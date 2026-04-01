"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Shield, BookOpen, Users, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const pillars = [
  {
    key: "protection" as const,
    icon: Shield,
    color: "text-cta",
    bg: "bg-cta/10",
  },
  {
    key: "knowledge" as const,
    icon: BookOpen,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    key: "community" as const,
    icon: Users,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    key: "connections" as const,
    icon: Globe,
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function ValueProposition() {
  const t = useTranslations("values");

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ key, icon: Icon, color, bg }) => (
            <Link key={key} href="/membership/benefits">
              <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${bg}`}
                  >
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t(`${key}.description`)}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    {t(`${key}.message`)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
