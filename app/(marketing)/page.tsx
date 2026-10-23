import { ContactSection } from '@/components/sections/home/ContactSection';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { JournalSection } from '@/components/sections/home/JournalSection';
import { ProcessSection } from '@/components/sections/home/ProcessSection';
import { ProjectsSection } from '@/components/sections/home/ProjectsSection';
import { ServicesSection } from '@/components/sections/home/ServicesSection';
import { StudioSection } from '@/components/sections/home/StudioSection';
import { WhySection } from '@/components/sections/home/WhySection';

export default function HomePage() {
  return (
    <>
      <div className="intro">
        <HeroSection />
        <WhySection />
        <ServicesSection />
      </div>
      <ProjectsSection />
      <ContactSection />
      <ProcessSection />
      <StudioSection />
      <JournalSection />
    </>
  );
}
