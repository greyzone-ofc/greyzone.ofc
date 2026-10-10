import { ArcCarousel } from "@/components/sections/home/arc-carousel";
import { Hero } from "@/components/sections/home/hero";
import { ServicesStack } from "@/components/sections/home/services-stack";
import { home } from "@/lib/content/home";

export default function Home() {
  return (
    <>
      <Hero {...home.hero} />
      <ArcCarousel {...home.projects} />
      <ServicesStack services={home.services} />
    </>
  );
}
