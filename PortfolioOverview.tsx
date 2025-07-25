// components/PortfolioOverview.tsx

'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { usePortfolioValue } from '@/hooks/usePortfolioValue'

export function PortfolioOverview() {
  const { address } = useAccount()
  const { 
    totalValue, 
    portfolioChange, 
    isLoading, 
    error 
  } = usePortfolioValue(address)

  const [showValue, setShowValue] = useState(false)

  useEffect(() => {
    // Simulate loading completion and then show the value with a reveal effect
    if (!isLoading && totalValue > 0) {
      const timer = setTimeout(() => {
        setShowValue(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, totalValue])

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-destructive">
          Error loading portfolio data: {error.message}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-8 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <h2 className="text-lg font-medium text-muted-foreground mb-2">
          Total Portfolio Value
        </h2>
        
        {isLoading ? (
          <div className="flex items-center space-x-4 h-12">
            <LoadingSpinner />
            <span className="text-muted-foreground">Loading portfolio data...</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showValue ? 1 : 0, 
              y: showValue ? 0 : 20 
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-baseline space-x-4">
              <h1 className="text-4xl font-bold">
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
              
              <div className={`text-lg font-medium ${portfolioChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <InfoCard
                title="Ethereum"
                value="$4,230.75"
                change="+2.4%"
                positive={true}
              />
              
              <InfoCard
                title="Polygon"
                value="$1,875.20"
                change="-1.2%"
                positive={false}
              />
              
              <InfoCard
                title="Arbitrum"
                value="$921.30"
                change="+5.8%"
                positive={true}
              />
              
              <InfoCard
                title="Base"
                value="$483.25"
                change="+0.9%"
                positive={true}
              />
            </div>
          </motion.div>
        )}
      </div>
    </Card>
  )
}

function InfoCard({ 
  title, 
  value, 
  change, 
  positive 
}: { 
  title: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <motion.div
      className="glassmorphism p-4 rounded-xl"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.2)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      <p className="text-xl font-bold mt-1">{value}</p>
      <p className={`text-sm font-medium mt-1 ${positive ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
    </motion.div>
  )
}
