'use client'

import { Navigation } from '@/components/navigation'
import { OpenBidsSection } from '@/components/open-bids-section'

export default function OpenBidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-l from-amber-300 via-slate-800 to-black">
      <Navigation />
      <div className="pt-20 pb-12">
        <OpenBidsSection />
      </div>
    </div>
  )
}
