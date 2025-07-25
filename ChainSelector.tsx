// components/ChainSelector.tsx

'use client'

import { useState } from 'react'
import { useChainId, useSwitchChain } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { supportedChains } from '@/lib/chains'

export function ChainSelector() {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentChain = supportedChains.find(chain => chain.id === chainId) || supportedChains[0]

  return (
    <div className="relative">
      <button
        className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:pointer-events-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={currentChain.iconUrl || `https://raw.githubusercontent.com/wagmi-dev/wagmi/main/packages/assets/chains/${currentChain.id}.svg`}
          alt={currentChain.name}
          className="w-5 h-5 mr-2"
        />
        {currentChain.name}
        <svg
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 rounded-lg glassmorphism shadow-lg z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <div className="py-2">
              {supportedChains.map(chain => (
                <motion.button
                  key={chain.id}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-secondary/20 transition-colors ${
                    chain.id === chainId ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => {
                    switchChain({ chainId: chain.id })
                    setIsOpen(false)
                  }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <img
                    src={chain.iconUrl || `https://raw.githubusercontent.com/wagmi-dev/wagmi/main/packages/assets/chains/${chain.id}.svg`}
                    alt={chain.name}
                    className="w-5 h-5 mr-2"
                  />
                  {chain.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
