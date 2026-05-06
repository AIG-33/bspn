"use client";

import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/glass-card";
import { ExternalLink, Navigation, MapPin } from "lucide-react";

interface Props {
  lat: number;
  lon: number;
  zoom?: number;
}

export function YandexMap({ lat, lon, zoom = 16 }: Props) {
  const t = useTranslations("page.contacts");

  const widgetUrl = `https://yandex.com/map-widget/v1/?ll=${lon}%2C${lat}&z=${zoom}&pt=${lon},${lat},pm2rdm&l=map`;
  const fullUrl = `https://yandex.by/maps/?ll=${lon}%2C${lat}&z=${zoom}&pt=${lon},${lat},pm2rdm`;
  const routeUrl = `https://yandex.by/maps/?rtext=~${lat}%2C${lon}&rtt=auto`;

  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="border-b border-foreground/8 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[var(--cta)] text-white shadow-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold sm:text-xl">
                {t("mapTitle")}
              </h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t("mapSubtitle")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate">
        <div className="aspect-[16/10] w-full sm:aspect-[21/9]">
          <iframe
            src={widgetUrl}
            title={t("mapTitle")}
            loading="lazy"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-3 sm:p-4">
          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-xl bg-cta px-3.5 py-2 text-xs font-semibold text-cta-foreground shadow-lg shadow-black/20 transition-all hover:bg-cta/90 hover:translate-y-[-1px] sm:text-sm"
          >
            <Navigation className="h-3.5 w-3.5" />
            {t("buildRoute")}
          </a>
          <a
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/90 px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg shadow-black/20 backdrop-blur-md transition-all hover:bg-white hover:translate-y-[-1px] sm:text-sm dark:bg-black/60 dark:text-white dark:hover:bg-black/80"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("openInYandex")}
          </a>
        </div>
      </div>
    </GlassCard>
  );
}
