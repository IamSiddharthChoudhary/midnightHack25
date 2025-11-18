'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleConnect = async () => {
    let isConnected = false
    let address = null
    try {
      // To authorize a DApp, call the enable() method and wait for 
      // the user to respond to the request.
      const connectorAPI = await window.midnight?.mnLace.enable()
      console.log("connectorAPI", connectorAPI)
      // Let's now check if the DApp is authorized, using the isEnabled() method
      const isEnabled = await window.midnight?.mnLace.isEnabled()
      if (isEnabled) {
        isConnected = true
        console.log("Connected to the wallet:", connectorAPI)

        // To get the wallet state, we call the state() API method, that will
        // return the DAppConnectorWalletState object, which is where we can get 
        // the wallet address from.
        const state = await connectorAPI.state()
        address = state.address
      }
    } catch (error) {
      console.log("An error occurred:", error)
    }

    setIsConnected(isConnected)
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