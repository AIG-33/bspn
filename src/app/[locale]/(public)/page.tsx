import { HeroSection } from "@/components/sections/hero";
import { ProblemsSection } from "@/components/sections/problems";
import { OnboardingBanner } from "@/components/sections/onboarding-banner";
import { ExpertsTeaser } from "@/components/sections/experts-teaser";
import { MembershipTeaser } from "@/components/sections/membership-teaser";
import { MembersMarquee } from "@/components/sections/members-marquee";
import { DigestSignup } from "@/components/sections/digest-signup";
import { CtaBanner } from "@/components/sections/cta-banner";

/**
 * Воронка главной страницы (каждый экран — шаг):
 * 1. Hero — кто мы и конкретный оффер (5 секунд).
 * 2. Проблемы — посетитель узнаёт свою боль и уходит вглубь.
 * 3. Как это работает — 3 шага от проблемы до изменения правил.
 * 4. Эксперты — именные практики и переход к подбору эксперта.
 * 5. Членство — что входит и сколько стоит, без скрытых условий.
 * 6. Кто уже с нами — отрасли союза.
 * 7. Дайджест — лёгкий первый шаг для тех, кто не готов вступать.
 * 8. CTA — вступление за 3 шага.
 *
 * Результаты квартала переехали на страницу «Кейсы и победы»
 * (/about/achievements) — пункт меню «Результаты».
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <OnboardingBanner />
      <ExpertsTeaser />
      <MembershipTeaser />
      <MembersMarquee />
      <DigestSignup />
      <CtaBanner />
    </>
  );
}
