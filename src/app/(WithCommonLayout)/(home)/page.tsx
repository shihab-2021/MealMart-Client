import AllReviews from "@/components/modules/Home/AllReviews";
import FAQ from "@/components/modules/Home/FAQ";
import HeroSection from "@/components/modules/Home/HeroSection";
import Organizations from "@/components/modules/Home/Organizations";
import StartShopping from "@/components/modules/Home/StartShopping";
import WhyMealMart from "@/components/modules/Home/WhyMealMart";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyMealMart />
      <StartShopping />
      <Organizations />
      <AllReviews />
      <FAQ />
    </main>
  );
}
