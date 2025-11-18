'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export function ClosedBidsSection() {
  const isEmpty = true

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Closed Bids</h1>
        <p className="text-slate-400 text-lg">
          View completed RFBs and winning bids with full transparency
        </p>
      </div>

      {/* Empty State */}
      {isEmpty && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-16 shadow-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 p-4 bg-slate-700/50 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 text-center">No Closed Bids Yet</h2>
            <p className="text-slate-400 text-center mb-8 max-w-sm">
              Closed bids will appear here once they receive all 3 quotes
            </p>
            <Button className="bg-black hover:bg-slate-900 text-white border border-white/10 px-8">
              View Open Bids
            </Button>
          </div>
        </div>
      )}

      {/* Content - when there are closed bids */}
      {!isEmpty && (
        <div className="grid gap-4">
          {/* Closed bid cards would go here */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">RFB-2024-XYZ9876</h3>
                <p className="text-slate-400 mt-1">Vanilla Bond | $1,000,000 | Closed: 11/15/2024</p>
                <p className="text-green-400 text-sm mt-2">Winning Quote: 3.45% | Winner: Morgan Stanley</p>
              </div>
              <Button variant="outline" size="sm" className="border-white/10">
                View Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
