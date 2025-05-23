import FAQ from "@/components/modules/Home/FAQ";
import HeroSection from "@/components/modules/Home/HeroSection";
import StartShopping from "@/components/modules/Home/StartShopping";
import WhyMealMart from "@/components/modules/Home/WhyMealMart";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyMealMart />
      <StartShopping />
      <FAQ />
    </main>
  );
}
