import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export const alt = "БСПН — Бизнес-союз нанимателей и предпринимателей";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale: "ru" | "en" | "zh" =
    locale === "en" || locale === "zh" ? locale : "ru";

  const tMeta = await getTranslations({ locale: safeLocale, namespace: "meta" });
  let title = SITE_NAME[safeLocale];
  let eyebrow = "";
  try {
    title = tMeta("ogTitle");
  } catch {
    /* fall through */
  }
  try {
    eyebrow = tMeta("siteName");
  } catch {
    /* fall through */
  }

  const siteName = SITE_NAME[safeLocale];
  const footer = FOOTER_NOTE[safeLocale];
  const allText = `${title}${eyebrow}${siteName}${footer}${DOMAIN}BSPN`;
  const hasCJK = /[\u3000-\u9fff\uff00-\uffef]/.test(allText);

  const logoBuf = await readFile(
    join(process.cwd(), "public/images/bspn-logo-mark@2x.png")
  );
  const logoDataUri = `data:image/png;base64,${logoBuf.toString("base64")}`;

  const [interBold, interMed, notoSC] = await Promise.all([
    loadGoogleFont("Inter", 700, allText),
    loadGoogleFont("Inter", 500, allText),
    hasCJK ? loadGoogleFont("Noto Sans SC", 700, allText) : Promise.resolve(null),
  ]);
  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 700; style: "normal" }[] = [];
  if (interBold) fonts.push({ name: "Inter", data: interBold, weight: 700, style: "normal" });
  if (interMed) fonts.push({ name: "Inter", data: interMed, weight: 500, style: "normal" });
  if (notoSC) fonts.push({ name: "Noto Sans SC", data: notoSC, weight: 700, style: "normal" });

  const titleSize = title.length <= 36 ? 84 : title.length <= 60 ? 72 : title.length <= 90 ? 60 : 50;

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
            {safeLocale.toUpperCase()}
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
