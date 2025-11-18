'use client'

import { Navigation } from '@/components/navigation'
import { OpenBidsSection } from '@/components/open-bids-section'

export default function OpenBidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div className="pt-20 pb-12">
        <OpenBidsSection />
      </div>
    </div>
  )
}
