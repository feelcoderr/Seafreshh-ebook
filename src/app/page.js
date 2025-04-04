import Header from "../components/Header";
import BannerBottom from "../components/BannerBottom";
import HeroSection from "../components/HeroSection";
import BundleSection from "../components/BundleSection";
import IncludedSection from "../components/IncludedSection";
import ProTipsSection from "../components/ProTipsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import LimitedOfferSection from "../components/LimitedOfferSection";
import Footer from "../components/Footer";
import GlobalOrderModal from "../components/GlobalOrderModal";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <BundleSection />
      <IncludedSection />
      <ProTipsSection />
      <TestimonialsSection />
      <LimitedOfferSection />
      <Footer />
      <BannerBottom />
      <GlobalOrderModal />
    </main>
  );
}
