'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { useState } from 'react'

declare global {
  interface Window {
    midnight?: {
      mnLace: {
        enable: () => Promise<any>;
        isEnabled: () => Promise<boolean>;
        state: () => Promise<{ address: string }>;
      };
    };
  }
}

export function Navigation() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleConnect = async () => {
    let connected = false
    let address = null
    try {
      if (!window.midnight?.mnLace) {
        console.error('Midnight wallet is not available')
        return
      }

      const connectorAPI = await window.midnight.mnLace.enable()
      console.log("connectorAPI", connectorAPI)
      
      const isEnabled = await window.midnight.mnLace.isEnabled()
      if (isEnabled) {
        connected = true
        console.log("Connected to the wallet:", connectorAPI)

       
        const state = await connectorAPI.state()
        address = state.address
      }
    } catch (error) {
      console.log("An error occurred:", error)
    }

    setIsConnected(connected)
    setWalletAddress(address)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress(null)
  }

  const truncateAddress = (address: string | null) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <nav className="relative top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-white" />
            <span className="text-white font-bold text-xl tracking-tight">BondBid ZKP</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link href="/create-rfb" className="text-gray-300 hover:text-white transition">Create RFB</Link>
            <Link href="/open-bids" className="text-gray-300 hover:text-white transition">Open Bids</Link>
            <Link href="/closed-bids" className="text-gray-300 hover:text-white transition">Closed Bids</Link>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm bg-green-600/20 px-3 py-1 rounded-full border border-green-500/30">
                {truncateAddress(walletAddress)}
              </span>
              <button 
                onClick={handleDisconnect}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              onClick={handleConnect}
              className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}