import {
  ContactSection,
  HeroSection,
  JournalSection,
  ProcessSection,
  ProjectsSection,
  ServicesSection,
  StudioSection,
  WhySection,
} from '@/features/home';

export function HomeTemplate() {
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
