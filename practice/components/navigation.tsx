'use client'

import Link from 'next/link'
import { Shield, X, AlertCircle } from 'lucide-react'
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
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

  const handleConnect = async () => {
    setIsLoading(true)
    setError(null)
    setShowErrorModal(false)
    
    try {
      // Check if midnight is available
      if (typeof window === 'undefined') {
        throw new Error('Window object not available')
      }

      console.log('Checking for Midnight wallet...', window.midnight)

      if (!window.midnight) {
        throw new Error('Midnight wallet extension is not installed. Please install it from the Chrome/Edge store.')
      }

      if (!window.midnight.mnLace) {
        throw new Error('Midnight Lace connector not found')
      }

      console.log('Attempting to enable wallet...')
      const connectorAPI = await window.midnight.mnLace.enable()
      console.log("connectorAPI", connectorAPI)
      
      const isEnabled = await window.midnight.mnLace.isEnabled()
      console.log("isEnabled", isEnabled)
      
      if (isEnabled) {
        const state = await connectorAPI.state()
        console.log("Wallet state:", state)
        
        if (state && state.address) {
          setIsConnected(true)
          setWalletAddress(state.address)
          console.log("Successfully connected to wallet:", state.address)
        } else {
          throw new Error('No address found in wallet state')
        }
      } else {
        throw new Error('Wallet connection was not enabled')
      }
    } catch (error) {
      console.error("Connection error:", error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet'
      setError(errorMessage)
      setShowErrorModal(true)
      setIsConnected(false)
      setWalletAddress(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress(null)
    setError(null)
  }

  const closeErrorModal = () => {
    setShowErrorModal(false)
    setError(null)
  }

  const truncateAddress = (address: string | null) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
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
                disabled={isLoading}
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-900 border border-red-500/30 rounded-xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="bg-red-600/20 border-b border-red-500/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-white font-bold text-lg">Connection Error</h3>
              </div>
              <button 
                onClick={closeErrorModal}
                className="text-gray-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <p className="text-gray-300 mb-4">{error}</p>
              
              {error?.includes('not installed') && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-400 mb-3">To use BondBid ZKP, you need to install the Midnight wallet extension:</p>
                  <ol className="text-sm text-gray-400 space-y-2 list-decimal list-inside">
                    <li>Visit the Chrome Web Store or Edge Add-ons</li>
                    <li>Search for "Midnight Wallet"</li>
                    <li>Click "Add to Browser"</li>
                    <li>Refresh this page after installation</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-800/50 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={closeErrorModal}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Close
              </button>
              {error?.includes('not installed') && (
                <a
                  href="https://chromewebstore.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Install Wallet
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}