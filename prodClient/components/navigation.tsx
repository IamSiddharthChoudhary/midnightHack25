'use client'

import Link from 'next/link'
import { Shield, X, AlertCircle, Wallet } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
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

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Floating Island Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-6 px-6">
        <nav className="max-w-7xl mx-auto bg-black/80 backdrop-blur-xl rounded-3xl border border-amber-500/20 shadow-2xl shadow-amber-500/10">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-amber-500/30 rounded-xl blur-xl group-hover:bg-amber-500/50 transition-all duration-300"></div>
                  <Shield className="w-10 h-10 text-amber-400 relative z-10 group-hover:text-amber-300 transition-colors drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400 font-bold text-2xl tracking-tight leading-none">BondBid</span>
                  <span className="text-amber-500/80 text-xs font-semibold tracking-wider">ZERO KNOWLEDGE</span>
                </div>
              </Link>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-2 bg-black/40 rounded-2xl p-2 border border-amber-900/20">
                <Link 
                  href="/" 
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive('/') 
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20' 
                      : 'text-gray-400 hover:text-amber-200 hover:bg-amber-500/5'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/create-rfb" 
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive('/create-rfb') 
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20' 
                      : 'text-gray-400 hover:text-amber-200 hover:bg-amber-500/5'
                  }`}
                >
                  Create RFB
                </Link>
                <Link 
                  href="/open-bids" 
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive('/open-bids') 
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20' 
                      : 'text-gray-400 hover:text-amber-200 hover:bg-amber-500/5'
                  }`}
                >
                  Open Bids
                </Link>
                <Link 
                  href="/closed-bids" 
                  className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${
                    isActive('/closed-bids') 
                      ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/20' 
                      : 'text-gray-400 hover:text-amber-200 hover:bg-amber-500/5'
                  }`}
                >
                  Closed Bids
                </Link>
              </div>

              {/* Wallet Connection */}
              {isConnected ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 px-5 py-3 rounded-2xl border border-emerald-500/30 backdrop-blur-sm shadow-lg shadow-emerald-500/10">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                    <Wallet className="w-4 h-4 text-emerald-400" />
                    <span className="text-white text-sm font-mono font-semibold">
                      {truncateAddress(walletAddress)}
                    </span>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="px-6 py-3 bg-gradient-to-r from-red-600/90 to-red-700/90 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 border border-red-500/20"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="relative px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-2xl font-bold hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden border border-amber-400/30"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    <Wallet className="w-5 h-5" />
                    {isLoading ? 'Connecting...' : 'Connect Wallet'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer to prevent content from going under floating navbar */}
      <div className="h-28"></div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-amber-500/20 max-w-md w-full mx-4 overflow-hidden animate-scaleIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600/20 via-red-700/20 to-amber-600/20 border-b border-red-500/30 px-7 py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-red-500/20 rounded-xl border border-red-500/30 shadow-lg shadow-red-500/20">
                  <AlertCircle className="w-7 h-7 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-xl">Connection Error</h3>
              </div>
              <button 
                onClick={closeErrorModal}
                className="text-gray-400 hover:text-white transition p-2 hover:bg-white/10 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-7 py-6">
              <p className="text-gray-300 mb-5 leading-relaxed">{error}</p>
              
              {error?.includes('not installed') && (
                <div className="bg-black/50 border border-amber-700/30 rounded-2xl p-6 mb-5 backdrop-blur-sm shadow-inner">
                  <p className="text-sm text-amber-200/90 mb-4 font-semibold">To use BondBid ZKP, install the Midnight wallet:</p>
                  <ol className="text-sm text-gray-400 space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-base">1.</span>
                      <span>Visit the Chrome Web Store or Edge Add-ons</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-base">2.</span>
                      <span>Search for "Midnight Wallet"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-base">3.</span>
                      <span>Click "Add to Browser"</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-amber-400 font-bold text-base">4.</span>
                      <span>Refresh this page after installation</span>
                    </li>
                  </ol>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-black/30 px-7 py-5 flex justify-end gap-3 border-t border-amber-900/20">
              <button
                onClick={closeErrorModal}
                className="px-6 py-3 bg-gray-800/80 text-white rounded-2xl hover:bg-gray-700/80 transition-all duration-300 font-medium border border-gray-700/50"
              >
                Close
              </button>
              {error?.includes('not installed') && (
                <a
                  href="https://chromewebstore.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-black rounded-2xl hover:from-amber-400 hover:to-yellow-500 transition-all duration-300 font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 border border-amber-400/30"
                >
                  Install Wallet
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}