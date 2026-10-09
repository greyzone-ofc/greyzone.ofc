import { Hero } from "@/components/sections/home/hero";
import { home } from "@/lib/content/home";

export default function Home() {
  return <Hero {...home.hero} />;
}
