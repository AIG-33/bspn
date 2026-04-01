import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bspn.by"
  ),
  title: {
    default: "БСПН — Белорусский союз предпринимателей и нанимателей",
    template: "%s | БСПН",
  },
  description:
    "Объединяем и защищаем белорусский бизнес с 1990 года. Более 35 лет на стороне предпринимателей. Членство, юридическая поддержка, мероприятия, международные связи.",
  keywords: [
    "БСПН",
    "бизнес союз",
    "предприниматели",
    "Беларусь",
    "членство",
    "защита бизнеса",
    "консультации",
    "юридическая помощь",
  ],
  authors: [{ name: "БСПН им. проф. М.С. Кунявского" }],
  openGraph: {
    type: "website",
    locale: "ru_BY",
    alternateLocale: "en_US",
    siteName: "БСПН",
    title: "БСПН — Белорусский союз предпринимателей и нанимателей",
    description:
      "Объединяем и защищаем белорусский бизнес с 1990 года.",
  },
  twitter: {
    card: "summary_large_image",
    title: "БСПН — Белорусский союз предпринимателей и нанимателей",
    description:
      "Объединяем и защищаем белорусский бизнес с 1990 года.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "/",
    languages: { "ru": "/ru", "en": "/en" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <a
          href="#main-content"
          className="skip-link focus:skip-link-visible"
        >
          Перейти к содержимому
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
