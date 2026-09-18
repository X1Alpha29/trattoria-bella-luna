import ExperienceSection from "@/components/site/ExperienceSection";
import FeaturedDishes from "@/components/site/FeaturedDishes";
import Hero from "@/components/site/Hero";
import IntroSection from "@/components/site/IntroSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <IntroSection />
      <FeaturedDishes />
      <ExperienceSection />
    </main>
  );
}