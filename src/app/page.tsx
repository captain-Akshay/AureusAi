import NavbarHeader from "@/components/header/navbar-header";
import About from "@/components/hero/about";
import AnimatedTestimonials from "@/components/hero/animated-testimonials";
import Company from "@/components/hero/company-slide";
import FAQ from "@/components/hero/faq";
import FeatureCard from "@/components/hero/feature-cards";
import FeaturesSection from "@/components/hero/features-section";
import Footer from "@/components/hero/footer";
import Intro from "@/components/hero/intro";

export default function Home() {
  return (
    <div className="">
      <NavbarHeader />
      <Intro />
      <Company />
      <AnimatedTestimonials />
      <About />
      <FeatureCard />
      <FeaturesSection />
      <FAQ />
      <Footer />
    </div>
  );
}
