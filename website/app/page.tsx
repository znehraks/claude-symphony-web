import dynamic from "next/dynamic";
import SectionSkeleton from "@/components/ui/section-skeleton";

import HeroSection from "@/components/sections/hero";
import QuickStartSection from "@/components/sections/quick-start";
import WaveDivider from "@/components/symphony/wave-divider";

const PipelineSection = dynamic(
  () => import("@/components/sections/pipeline"),
  { loading: () => <SectionSkeleton height="h-[600px]" /> }
);

const FeaturesSection = dynamic(
  () => import("@/components/sections/features"),
  { loading: () => <SectionSkeleton height="h-96" /> }
);

const CTASection = dynamic(
  () => import("@/components/sections/cta"),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <WaveDivider />
      <QuickStartSection />
      <WaveDivider />
      <PipelineSection />
      <WaveDivider />
      <FeaturesSection />
      <WaveDivider />
      <CTASection />
    </>
  );
}
