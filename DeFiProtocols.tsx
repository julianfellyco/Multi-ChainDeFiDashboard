// components/DeFiProtocols.tsx

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { useDeFiPositions } from '@/hooks/useDeFiPositions'
import { useAccount } from 'wagmi'

export function DeFiProtocols() {
  const { address } = useAccount()
  const { positions, isLoading } = useDeFiPositions(address)
  const [activeTab, setActiveTab] = useState<'all' | 'lending' | 'liquidity' | 'staking'>('all')

  const tabs = [
    { id: 'all', label: 'All Protocols' },
    { id: 'lending', label: 'Lending' },
    { id: 'liquidity', label: 'Liquidity' },
    { id: 'staking', label: 'Staking' },
  ] as const

  const filteredPositions = positions.filter(position => 
    activeTab === 'all' || position.type === activeTab
  )

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">DeFi Positions</h2>
      
      <div className="flex space-x-1 mb-6 bg-secondary/30 p-1 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`relative flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === tab.id ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {activeTab === tab.id && (
              <motion.div
                className="absolute inset-0 bg-primary rounded-md"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-32 rounded-lg skeleton" />
          ))}
        </div>
      ) : filteredPositions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-3">🏦</div>
          <h3 className="text-lg font-medium mb-2">No DeFi positions found</h3>
          <p>Connect to DeFi protocols to start earning yield</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPositions.map((position) => (
            <ProtocolCard key={position.id} position={position} />
          ))}
        </div>
      )}
    </Card>
  )
}

interface ProtocolCardProps {
  position: {
    id: string
    protocol: {
      name: string
      icon: string
      url: string
    }
    type: 'lending' | 'liquidity' | 'staking'
    asset: string
    value: number
    apy: number
    chainId: number
  }
}

function ProtocolCard({ position }: ProtocolCardProps) {
  return (
    <motion.div
      className="glassmorphism p-4 rounded-xl flex"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="mr-4">
        <img
          src={position.protocol.icon}
          alt={position.protocol.name}
          className="w-12 h-12 rounded-lg"
        />
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold">{position.protocol.name}</h3>
            <div className="text-sm text-muted-foreground">
              {position.asset}
            </div>
          </div>
          
          <div className="text-right">
            <div className="font-bold">
              ${position.value.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-sm text-green-500">
              {position.apy.toFixed(2)}% APY
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex justify-between">
          <span className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground">
            {position.type.charAt(0).toUpperCase() + position.type.slice(1)}
          </span>
          
          <button className="text-xs text-primary font-medium hover:underline">
            Manage →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
