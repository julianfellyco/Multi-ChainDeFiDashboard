// components/TokenList.tsx

'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from './ui/Card'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { useTokenBalance } from '@/hooks/useTokenBalance'
import { commonTokens } from '@/lib/tokens'

interface TokenListProps {
  selectedToken: string | null
  setSelectedToken: (token: string) => void
}

export function TokenList({ selectedToken, setSelectedToken }: TokenListProps) {
  const { address } = useAccount()
  const { balances, isLoading, error } = useTokenBalance(address)
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredTokens = commonTokens.filter(token => 
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="flex flex-col h-[500px]">
      <div className="p-4 border-b border-border/40">
        <h2 className="text-lg font-bold">Tokens</h2>
        <div className="relative mt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tokens..."
            className="w-full p-2 pl-8 rounded-lg bg-secondary/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <svg
            className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-destructive text-center p-4">
            Error loading token balances
          </div>
        ) : (
          <AnimatePresence>
            {filteredTokens.map((token) => (
              <motion.div
                key={token.address}
                layoutId={token.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <TokenItem
                  token={token}
                  balance={balances[token.address] || 0}
                  isSelected={selectedToken === token.address}
                  onClick={() => setSelectedToken(token.address)}
                />
              </motion.div>
            ))}
            
            {filteredTokens.length === 0 && (
              <div className="text-center text-muted-foreground p-4">
                No tokens found for "{searchQuery}"
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </Card>
  )
}

interface TokenItemProps {
  token: typeof commonTokens[0]
  balance: number
  isSelected: boolean
  onClick: () => void
}

function TokenItem({ token, balance, isSelected, onClick }: TokenItemProps) {
  const tokenValue = token.price * balance
  
  return (
    <motion.div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'bg-primary/10' : 'hover:bg-secondary/50'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <img
        src={token.logoURI}
        alt={token.name}
        className="w-8 h-8 rounded-full mr-3"
      />
      
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium">{token.symbol}</span>
          <span className="font-medium">
            ${tokenValue.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{token.name}</span>
          <span>
            {balance.toLocaleString('en-US', {
              minimumFractionDigits: token.decimals > 6 ? 4 : 2,
              maximumFractionDigits: token.decimals > 6 ? 4 : 2,
            })}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

