import { HeroSection } from "@/components/HeroSection";
import { WorkHistorySection } from "@/components/WorkHistorySection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ResumeSection } from "@/components/ResumeSection";
import { RoleFitSection } from "@/components/RoleFitSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <WorkHistorySection />
      <ResumeSection />
      <RoleFitSection />
    </>
  );
}
