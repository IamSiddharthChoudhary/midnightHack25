'use client'

import { Navigation } from '@/components/navigation'
import { ClosedBidsSection } from '@/components/closed-bids-section'

export default function ClosedBidsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      <div className="pt-20 pb-12">
        <ClosedBidsSection />
      </div>
    </div>
  )
}
