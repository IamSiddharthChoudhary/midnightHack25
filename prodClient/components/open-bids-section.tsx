'use client'

import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'

export function OpenBidsSection() {
  const isEmpty = true

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Open Bids</h1>
        <p className="text-slate-400 text-lg">
          Select an open RFB to participate and submit your quote
        </p>
      </div>

      {/* Empty State */}
      {isEmpty && (
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-16 shadow-xl">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-6 p-4 bg-slate-700/50 rounded-full">
              <TrendingUp className="w-12 h-12 text-slate-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 text-center">No Open Bids</h2>
            <p className="text-slate-400 text-center mb-8 max-w-sm">
              There are currently no open Request for Bids. Create one to get started.
            </p>
            <Button className="bg-black hover:bg-slate-900 text-white border border-white/10 px-8">
              Create New RFB
            </Button>
          </div>
        </div>
      )}

      {/* Content - when there are bids */}
      {!isEmpty && (
        <div className="grid gap-4">
          {/* Bid cards would go here */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">RFB-2025-ABC1234</h3>
                <p className="text-slate-400 mt-1">Vanilla Bond | $1,000,000 | Due: 12/31/2025</p>
              </div>
              <Button variant="outline" size="sm" className="border-white/10">
                Submit Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
