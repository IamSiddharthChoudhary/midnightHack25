'use client'

import { BgComponent } from '@/components/bg-component'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const strings = [
  "PRIVATE QUOTES.\nPUBLIC PROOF.\nZERO LEAKAGE.",
  "WIN THE DEAL.\nKEEP YOUR PRICE\nA SECRET.",
  "BID IN SHADOWS.\nWIN IN THE LIGHT.\nZK POWERED.",
  "THE MOST PRIVATE\nRFQ SYSTEM EVER\nBUILT.",
  "YOUR PRICE IS\nYOUR SECRET.\nFOREVER.",
]

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    hero.innerHTML = strings[index].replace(/\n/g, '<br>')

    const startTextCycle = () => {
      let iterations = 0
      const currentIndex = index
      const nextIndex = (currentIndex + 1) % strings.length
      const nextText = strings[nextIndex]
      const nextTextLines = nextText.split('\n')

      const interval = setInterval(() => {
        const animatedLines = nextTextLines.map((line, lineIndex) => {
          return line
            .split('')
            .map((letter, i) => {
              if (i < iterations) {
                return letter
              }
              return letters[Math.floor(Math.random() * letters.length)]
            })
            .join('')
        })

        hero.innerHTML = animatedLines.join('<br>')

        iterations += 1

        if (iterations > Math.max(...nextTextLines.map((line) => line.length))) {
          clearInterval(interval)
          setIndex(nextIndex)
        }
      }, 50)
    }

    const initialTimeout = setTimeout(startTextCycle, 3000)

    return () => {
      clearTimeout(initialTimeout)
    }
  }, [index, strings])

  return (
    <div className="relative w-full min-h-screen overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <BgComponent />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none">
        <div className="mb-8">
          <span className="inline-block bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm text-gray-300">
            • Powered by Zero-Knowledge Proofs
          </span>
        </div>

        <div className="text-center mb-12">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-mono font-black text-white text-center leading-tight whitespace-pre-line select-none"
            ref={heroRef}
          />
        </div>

        {/* <p className="text-lg sm:text-xl text-gray-300 max-w-2xl text-center mb-12">
          Create and participate in Request for Bids for Vanilla and Exotic Bonds. Our ZKP technology ensures bid confidentiality while maintaining transparency.
        </p> */}

        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <Link href="/create-rfb" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2 justify-center">
            Create New RFB
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/open-bids" className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition">
            View Open Bids
          </Link>
        </div>
      </div>
    </div>
  )
}
