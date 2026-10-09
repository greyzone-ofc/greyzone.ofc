import { Hero } from "@/components/sections/home/hero";
import { ServicesStack } from "@/components/sections/home/services-stack";
import { home } from "@/lib/content/home";

export default function Home() {
  return (
    <>
      <Hero {...home.hero} />
      <ServicesStack services={home.services} />
    </>
  );
}
