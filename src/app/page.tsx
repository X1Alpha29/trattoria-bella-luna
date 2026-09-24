import ExperienceSection from "@/components/site/ExperienceSection";
import FeaturedDishes from "@/components/site/FeaturedDishes";
import Footer from "@/components/site/Footer";
import GallerySection from "@/components/site/GallerySection";
import Hero from "@/components/site/Hero";
import IntroSection from "@/components/site/IntroSection";
import LocationSection from "@/components/site/LocationSection";
import ReviewsSection from "@/components/site/ReviewsSection";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <IntroSection />
        <FeaturedDishes />
        <ExperienceSection />
        <GallerySection />
        <ReviewsSection />
        <LocationSection />
      </main>

      <Footer />
    </>
  );
}