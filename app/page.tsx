// app/page.tsx - Main Dashboard Page

'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from '@/components/ConnectButton'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { TokenList } from '@/components/TokenList'
import { DeFiProtocols } from '@/components/DeFiProtocols'
import { TransactionHistory } from '@/components/TransactionHistory'
import { PriceChart } from '@/components/PriceChart'
import { Card } from '@/components/ui/Card'

export default function Home() {
  const { isConnected } = useAccount()
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Modern DeFi Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
            Track your portfolio across multiple chains, interact with DeFi protocols, and monitor your investments - all in one place.
          </p>
          <ConnectButton />
        </motion.div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Multi-Chain Support</h3>
            <p className="text-muted-foreground">Ethereum, Polygon, Arbitrum, Base</p>
          </Card>
          
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">DeFi Integrations</h3>
            <p className="text-muted-foreground">Uniswap, Aave, Compound, 1inch</p>
          </Card>
          
          <Card className="p-6 text-center">
            <h3 className="text-lg font-medium mb-2">Real-Time Data</h3>
            <p className="text-muted-foreground">Portfolio tracking, price alerts</p>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <PortfolioOverview />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <PriceChart selectedToken={selectedToken} />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <TokenList 
              selectedToken={selectedToken} 
              setSelectedToken={setSelectedToken}
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <DeFiProtocols />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TransactionHistory />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
