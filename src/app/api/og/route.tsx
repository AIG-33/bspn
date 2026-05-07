import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
// Dynamic by virtue of reading query params; we cache at the CDN via headers below.
export const dynamic = "force-dynamic";

const SIZE = { width: 1200, height: 630 };

const SITE_NAME: Record<string, string> = {
  ru: "БСПН — Бизнес-союз нанимателей и предпринимателей",
  en: "BSPN — Business Union of Employers and Entrepreneurs",
  zh: "白俄罗斯雇主与企业家联盟 (BSPN)",
};

const FOOTER_NOTE: Record<string, string> = {
  ru: "С 1990 года · Минск, Беларусь",
  en: "Since 1990 · Minsk, Belarus",
  zh: "成立于 1990 年 · 白俄罗斯明斯克",
};

const DOMAIN = "bspn.by";

/**
 * Pull TTF data for a Google Font subset that covers exactly the glyphs in `text`.
 * Adding a desktop User-Agent forces Google to return TTF (Satori only supports
 * ttf/otf/woff). The request is small and cached by Google's CDN.
 */
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer | null> {
  if (!text) return null;
  const familyParam = family.replace(/ /g, "+");
  const url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&text=${encodeURIComponent(
    text
  )}`;
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      },
    });
    if (!res.ok) return null;
    const css = await res.text();
    const match = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

let _logoCache: string | null = null;
async function getLogoDataUri(): Promise<string> {
  if (_logoCache) return _logoCache;
  const buf = await readFile(
    join(process.cwd(), "public/images/bspn-logo-mark@2x.png")
  );
  _logoCache = `data:image/png;base64,${buf.toString("base64")}`;
  return _logoCache;
}

function pickTitleSize(title: string) {
  const len = title.length;
  if (len <= 36) return 84;
  if (len <= 60) return 72;
  if (len <= 90) return 60;
  if (len <= 120) return 50;
  return 44;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawLocale = searchParams.get("locale") || "ru";
  const locale: "ru" | "en" | "zh" =
    rawLocale === "en" || rawLocale === "zh" ? rawLocale : "ru";

  const title = (searchParams.get("title") || SITE_NAME[locale]).slice(0, 200);
  const eyebrow = (searchParams.get("eyebrow") || "").slice(0, 80);
  const siteName = SITE_NAME[locale];
  const footer = FOOTER_NOTE[locale];

  // Single text bag for tight glyph subset on Google Fonts.
  const allText = `${title}${eyebrow}${siteName}${footer}${DOMAIN}BSPN`;
  const hasCJK = /[\u3000-\u9fff\uff00-\uffef]/.test(allText);

  const [logoDataUri, interBold, interMed, notoSC] = await Promise.all([
    getLogoDataUri(),
    loadGoogleFont("Inter", 700, allText),
    loadGoogleFont("Inter", 500, allText),
    hasCJK ? loadGoogleFont("Noto Sans SC", 700, allText) : Promise.resolve(null),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 700; style: "normal" }[] = [];
  if (interBold) fonts.push({ name: "Inter", data: interBold, weight: 700, style: "normal" });
  if (interMed) fonts.push({ name: "Inter", data: interMed, weight: 500, style: "normal" });
  if (notoSC) fonts.push({ name: "Noto Sans SC", data: notoSC, weight: 700, style: "normal" });

  const titleSize = pickTitleSize(title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0d0f3a 0%, #2a2877 30%, #5436c8 60%, #c63b5a 92%, #e0a64a 100%)",
          color: "#ffffff",
          fontFamily: "Inter, 'Noto Sans SC', sans-serif",
          padding: "60px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative orbs */}
        <div
          style={{
            position: "absolute",
            right: -180,
            top: -180,
            width: 540,
            height: 540,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at center, rgba(232,90,79,0.55), rgba(232,90,79,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -160,
            bottom: -200,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at center, rgba(91,62,224,0.55), rgba(91,62,224,0) 70%)",
            display: "flex",
          }}
        />
        {/* subtle grid hairline */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />

        {/* Top row */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 22,
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))",
                border: "1px solid rgba(255,255,255,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 24px 48px -16px rgba(0,0,0,0.5)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoDataUri}
                alt="BSPN"
                width={62}
                height={58}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                  lineHeight: 1,
                }}
              >
                BSPN
              </div>
              <div
                style={{
                  marginTop: 6,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {DOMAIN}
              </div>
            </div>
          </div>

          {eyebrow ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 22px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                fontSize: 18,
                fontWeight: 500,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  background: "#e0a64a",
                  display: "flex",
                }}
              />
              {eyebrow}
            </div>
          ) : null}
        </div>

        {/* Title */}
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 24,
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: -1.2,
              maxWidth: 1040,
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,0.18)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {siteName}
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 15,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              {footer}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {locale.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: fonts.length ? fonts : undefined,
      headers: {
        "Cache-Control":
          "public, max-age=60, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
