// components/ConnectButton.tsx - Modern Wallet Connection with ConnectKit

'use client'

import { ConnectKitButton } from 'connectkit'
import { motion } from 'framer-motion'
import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { formatEther } from 'viem'
import { 
  WalletIcon, 
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  DocumentDuplicateIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const [showDropdown, setShowDropdown] = useState(false)
  
  const { data: balance } = useBalance({
    address,
  })

  // Custom ConnectKit button
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        if (isConnecting) {
          return (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-button px-4 py-2 rounded-xl flex items-center space-x-2 min-w-[140px] justify-center"
              disabled
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full"
              />
              <span className="text-sm font-medium">Connecting...</span>
            </motion.button>
          )
        }

        if (!isConnected) {
          return (
            <motion.button
              onClick={show}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl font-semibold text-sm flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <WalletIcon className="w-4 h-4" />
              <span>Connect Wallet</span>
            </motion.button>
          )
        }

        // Connected state - show wallet info with dropdown
        return (
          <div className="relative">
            <motion.button
              onClick={() => setShowDropdown(!showDropdown)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-button px-4 py-2 rounded-xl flex items-center space-x-3 min-w-[200px]"
            >
              {/* Chain indicator */}
              <div className={`w-3 h-3 rounded-full ${getChainColor(chain?.id)}`} />
              
              {/* Address/ENS */}
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-white">
                  {ensName || `${address?.slice(0, 6)}...${address?.slice(-4)}`}
                </div>
                {balance && (
                  <div className="text-xs text-gray-400">
                    {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
                  </div>
                )}
              </div>
              
              <motion.div
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 glass-card border border-white/10 rounded-xl shadow-2xl z-50"
                >
                  {/* Wallet Info Header */}
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <WalletIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">
                          {ensName || 'Wallet Connected'}
                        </div>
                        <div className="text-sm text-gray-400 font-mono">
                          {address?.slice(0, 12)}...{address?.slice(-8)}
                        </div>
                      </div>
                    </div>
                    
                    {/* Balance */}
                    {balance && (
                      <div className="mt-3 p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Balance</div>
                        <div className="text-lg font-bold text-white">
                          {parseFloat(formatEther(balance.value)).toFixed(6)} ETH
                        </div>
                        <div className="text-xs text-gray-400">
                          ≈ ${(parseFloat(formatEther(balance.value)) * 2000).toFixed(2)} USD
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(address || '')
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm"
                    >
                      <DocumentDuplicateIcon className="w-4 h-4" />
                      <span>Copy Address</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        window.open(`https://etherscan.io/address/${address}`, '_blank')
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm"
                    >
                      <EyeIcon className="w-4 h-4" />
                      <span>View on Explorer</span>
                    </button>
                    
                    <div className="border-t border-white/10 my-2" />
                    
                    <button
                      onClick={() => {
                        disconnect()
                        setShowDropdown(false)
                      }}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all text-sm"
                    >
                      <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click outside to close */}
            {showDropdown && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowDropdown(false)}
              />
            )}
          </div>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

// Helper function to get chain color
function getChainColor(chainId?: number): string {
  const colors: Record<number, string> = {
    1: 'bg-blue-500', // Ethereum
    137: 'bg-purple-500', // Polygon
    42161: 'bg-blue-600', // Arbitrum
    8453: 'bg-blue-400', // Base
    11155111: 'bg-yellow-500', // Sepolia
  }
  return colors[chainId || 1] || 'bg-gray-500'
}
