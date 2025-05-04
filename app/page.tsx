import { Navbar } from "./components/navbar"
import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"
import { HowItWorks } from "./components/how-it-works"
import { PricingSection } from "./components/pricing-section"
import { CTASection } from "./components/cta-section"
import { Footer } from "./components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
