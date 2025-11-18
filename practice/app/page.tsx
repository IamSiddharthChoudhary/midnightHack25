'use client'

import { HeroSection } from '@/components/hero-section'
import { Navigation } from '@/components/navigation'
import { FeatureSection } from '@/components/feature-section'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </div>
  )
}
