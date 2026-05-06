"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function NewsPreview() {
  const t = useTranslations("news");

  const news = [
    {
      id: 1,
      title: t("mock1Title"),
      category: t("categoryLegislation"),
      date: t("mock1Date"),
      slug: "/news/1",
    },
    {
      id: 2,
      title: t("mock2Title"),
      category: t("categoryEvents"),
      date: t("mock2Date"),
      slug: "/news/2",
    },
    {
      id: 3,
      title: t("mock3Title"),
      category: t("categoryMembers"),
      date: t("mock3Date"),
      slug: "/news/3",
    },
  ];

  const events = [
    {
      id: 1,
      title: t("event1Title"),
      date: t("event1Date"),
      location: t("event1Location"),
      slug: "/events/1",
    },
    {
      id: 2,
      title: t("event2Title"),
      date: t("event2Date"),
      location: t("event2Location"),
      slug: "/events/2",
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3">
            <div className="mb-8 flex items-end justify-between gap-3">
              <div>
                <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                  {t("title")}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("subtitle")}
                </p>
              </div>
              <Link
                href="/news"
                className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                {t("viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {news.map((item) => (
                <Link key={item.id} href={item.slug}>
                  <GlassCard hoverable className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {item.category}
                        </Badge>
                        <h3 className="font-heading text-sm font-semibold leading-snug sm:text-base">
                          {item.title}
                        </h3>
                      </div>
                      <span className="shrink-0 font-mono text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>

            <Link
              href="/news"
              className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-8 flex items-end justify-between gap-3">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">
                {t("events")}
              </h2>
              <Link
                href="/events"
                className="hidden shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                {t("viewAllEvents")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {events.map((event) => (
                <GlassCard
                  key={event.id}
                  className="border border-primary/15 bg-primary/[0.06] p-5"
                >
                  <h3 className="font-heading text-sm font-semibold leading-snug">
                    {event.title}
                  </h3>
                  <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {event.location}
                    </div>
                  </div>
                  <Link
                    href={event.slug}
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "mt-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                  >
                    {t("register")}
                  </Link>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
