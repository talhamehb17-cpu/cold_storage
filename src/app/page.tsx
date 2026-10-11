import { Hero } from "@/components/hero/Hero";
import { ColdChainSection } from "@/components/cold-chain/ColdChainSection";
import { ProductsSection } from "@/components/products/ProductsSection";
import { FacilitySection } from "@/components/facility/FacilitySection";
import { TemperatureSection } from "@/components/temperature/TemperatureSection";
import { InventorySection } from "@/components/inventory/InventorySection";
import { SecuritySection } from "@/components/security/SecuritySection";
import { LogisticsSection } from "@/components/logistics/LogisticsSection";
import { StorageSection } from "@/components/storage/StorageSection";
import { TrustSection } from "@/components/trust/TrustSection";
import { InquirySection } from "@/components/inquiry/InquirySection";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/footer/Footer";

/**
 * The complete one-page cinematic experience.
 * Everything on `/` — navigation smooth-scrolls between sections.
 */
export default function HomePage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <ColdChainSection />
        <ProductsSection />
        <FacilitySection />
        <TemperatureSection />
        <InventorySection />
        <SecuritySection />
        <LogisticsSection />
        <StorageSection />
        <TrustSection />
        <InquirySection />
      </main>
      <Footer />
    </>
  );
}
