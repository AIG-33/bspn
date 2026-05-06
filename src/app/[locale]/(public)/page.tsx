import { HeroSection } from "@/components/sections/hero";
import { OnboardingBanner } from "@/components/sections/onboarding-banner";
import { ValueProposition } from "@/components/sections/value-proposition";
import { DirectionsSection } from "@/components/sections/directions";
import { NewsPreview } from "@/components/sections/news-preview";
import { MembersMarquee } from "@/components/sections/members-marquee";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <OnboardingBanner />
      <ValueProposition />
      <DirectionsSection />
      <NewsPreview />
      <MembersMarquee />
      <CtaBanner />
    </>
  );
}
