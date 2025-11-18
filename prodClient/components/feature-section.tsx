'use client'

import { Shield, TrendingUp, CheckCircle2, Lock } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Create Request for Bid',
    description: 'Initiate a new bond RFB secured with Zero-Knowledge Proof technology',
    badge: 'Secure',
  },
  {
    icon: TrendingUp,
    title: 'Open Bids',
    description: 'Select an open RFB to participate and submit your quote',
    badge: 'Active',
  },
  {
    icon: CheckCircle2,
    title: 'Closed Bids',
    description: 'View completed RFBs and winning bids with full transparency',
    badge: 'Transparent',
  },
  {
    icon: Lock,
    title: 'Zero-Knowledge Proof',
    description: 'All bid quotes encrypted using ZKP, ensuring complete confidentiality',
    badge: 'Private',
  },
]

export function FeatureSection() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A revolutionary approach to bond trading with privacy-preserving technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/30 transition hover:bg-white/10"
              >
                <div className="mb-4 inline-block p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="mb-3">
                  <span className="inline-block text-xs font-semibold text-white/60 bg-white/5 px-2 py-1 rounded">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Benefits subsection */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <p className="text-gray-400">Encrypted Bids</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">Zero</div>
            <p className="text-gray-400">Data Leakage</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">Full</div>
            <p className="text-gray-400">Transparency</p>
          </div>
        </div>
      </div>
    </section>
  )
}
