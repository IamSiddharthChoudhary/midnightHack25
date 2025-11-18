'use client'

import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to revolutionize your bond trading?
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of secure, transparent bond trading with Zero-Knowledge Proof technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
              Learn More
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-8">
            No credit card required. Start building your first RFB in minutes.
          </p>
        </div>
      </div>
    </section>
  )
}
