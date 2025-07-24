// app/page.tsx - Main Dashboard Page

'use client'

import { useAccount, useChainId } from 'wagmi'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@/components/ConnectButton'
import { PortfolioOverview } from '@/components/PortfolioOverview'
import { ChainSelector } from '@/components/ChainSelector'
import { TokenList } from '@/components/TokenList'
import { DeFiProtocols } from '@/components/DeFiProtocols'
import { TransactionHistory } from '@/components/TransactionHistory'
import { PriceChart } from '@/components/PriceChart'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Card } from '@/components/ui/Card'
import { 
  WalletIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  SparklesIcon,
  FireIcon,
  ArrowTrendingUpIcon,
  BoltIcon
} from '@heroicons/react/24/outline'

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function DashboardPage() {
  const { address, isConnected, isConnecting } = useAccount()
  const chainId = useChainId()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  // Not connected state
  if (!isConnected && !isConnecting) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto px-4"
        >
          {/* Hero Section */}
          <motion.div variants={fadeInVariants} className="mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <SparklesIcon className="w-20 h-20 text-purple-400" />
            </motion.div>
            
            <h1 className="text-4xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Modern DeFi
              </span>
              <br />
              <span className="text-white text-3xl md:text-5xl">
                Portfolio Tracker
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Track your DeFi portfolio across <strong className="text-purple-400">multiple chains</strong> with 
              real-time data, advanced analytics, and beautiful visualizations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30">
                ⚡ Multi-chain
              </span>
              <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full border border-blue-500/30">
                🔗 DeFi protocols
              </span>
              <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
                📊 Real-time data
              </span>
              <span className="bg-pink-500/20 text-pink-300 px-4 py-2 rounded-full border border-pink-500/30">
                🎨 Beautiful UI
              </span>
            </div>
          </motion.div>

          {/* Connect Wallet Card */}
          <motion.div variants={fadeInVariants} className="mb-12">
            <div className="glass-card p-8 md:p-12 max-w-lg mx-auto">
              <WalletIcon className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Connect Your Wallet</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Connect your wallet to access your multi-chain DeFi portfolio and start tracking your assets.
              </p>
              <ConnectButton />
              
              <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-sm text-blue-300">
                  <strong>Supported wallets:</strong> MetaMask, WalletConnect, Coinbase Wallet, and more
                </p>
              </div>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInVariants}>
              <Card className="p-8 text-center hover:scale-105 transition-transform duration-300">
                <ChartBarIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3">Multi-Chain Portfolio</h4>
                <p className="text-gray-300 leading-relaxed">
                  Track assets across Ethereum, Polygon, Arbitrum, and Base. 
                  Get unified portfolio view with real-time valuations.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Card className="p-8 text-center hover:scale-105 transition-transform duration-300">
                <FireIcon className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3">DeFi Protocols</h4>
                <p className="text-gray-300 leading-relaxed">
                  Integrated with Uniswap, Aave, Compound, and more. 
                  Track lending, borrowing, and liquidity positions.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Card className="p-8 text-center hover:scale-105 transition-transform duration-300">
                <CurrencyDollarIcon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3">Real-time Analytics</h4>
                <p className="text-gray-300 leading-relaxed">
                  Live prices, yield tracking, performance analytics, 
                  and advanced portfolio insights.
                </p>
              </Card>
            </motion.div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={fadeInVariants} className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-gray-300">Built with Modern Web3 Stack</h3>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/10">
                Next.js 14
              </span>
              <span className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/10">
                TypeScript
              </span>
              <span className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/10">
                wagmi v2
              </span>
              <span className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/10">
                viem
              </span>
              <span className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/10">
                Tailwind CSS
              </span>
              <span className="bg-black/30 text-white px-4 py-2 rounded-lg border border-white/10">
                Framer Motion
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  // Loading state
  if (isConnecting) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Connecting to your wallet...</h3>
          <p className="text-gray-400">Please check your wallet and approve the connection.</p>
        </motion.div>
      </div>
    )
  }

  // Connected state - Show dashboard
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio Dashboard
            </span>
          </h1>
          <p className="text-gray-300 mt-2 text-lg">
            Welcome back! Here's your DeFi portfolio overview across all chains.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <ChainSelector />
          <ConnectButton />
        </motion.div>
      </div>

      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <PortfolioOverview address={address!} chainId={chainId} />
      </motion.div>

      {/* Main Dashboard Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid lg:grid-cols-12 gap-8"
      >
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Token Holdings */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <CurrencyDollarIcon className="w-6 h-6 text-green-400" />
                Token Holdings
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Live prices
              </div>
            </div>
            <TokenList address={address!} chainId={chainId} />
          </Card>

          {/* DeFi Protocols */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold flex items-center gap-3">
                <FireIcon className="w-6 h-6 text-orange-400" />
                DeFi Positions
              </h2>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full"
              />
            </div>
            <DeFiProtocols address={address!} chainId={chainId} />
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Portfolio Chart */}
          <Card>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <ArrowTrendingUpIcon className="w-5 h-5 text-blue-400" />
              Portfolio Performance
            </h2>
            <PriceChart address={address!} />
          </Card>

          {/* Recent Transactions */}
          <Card>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
              <BoltIcon className="w-5 h-5 text-yellow-400" />
              Recent Activity
            </h2>
            <TransactionHistory address={address!} chainId={chainId} />
          </Card>
        </div>
      </motion.div>

      {/* Developer Attribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center py-8"
      >
        <Card className="p-6 max-w-3xl mx-auto bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <h3 className="text-lg font-semibold mb-2">🚀 Built with Cutting-Edge Web3 Technologies</h3>
          <p className="text-gray-300 mb-4">
            Next.js 14 • TypeScript • wagmi v2 • viem • Tailwind CSS • Framer Motion • ConnectKit
          </p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <span className="text-purple-400 flex items-center gap-1">
              <SparklesIcon className="w-4 h-4" />
              Multi-chain
            </span>
            <span className="text-blue-400 flex items-center gap-1">
              <FireIcon className="w-4 h-4" />
              DeFi integrated
            </span>
            <span className="text-green-400 flex items-center gap-1">
              <ArrowTrendingUpIcon className="w-4 h-4" />
              Real-time data
            </span>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  )
}
