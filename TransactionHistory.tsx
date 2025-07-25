// components/TransactionHistory.tsx

'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { formatDistanceToNow } from 'date-fns'

export function TransactionHistory() {
  const { address } = useAccount()
  const [isLoading] = useState(false)
  
  // Mock transaction data
  const transactions = [
    {
      id: '0x1234...5678',
      type: 'swap',
      description: 'Swap 0.5 ETH for 1,200 USDC',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      status: 'completed',
      value: 850,
      chainId: 1, // Ethereum
    },
    {
      id: '0xabcd...ef01',
      type: 'deposit',
      description: 'Deposit 1,000 USDC to Aave',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: 'completed',
      value: 1000,
      chainId: 137, // Polygon
    },
    {
      id: '0x2345...6789',
      type: 'withdraw',
      description: 'Withdraw 0.2 ETH from Compound',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      status: 'completed',
      value: 340,
      chainId: 42161, // Arbitrum
    },
    {
      id: '0xefgh...ijkl',
      type: 'claim',
      description: 'Claim 25 UNI rewards',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: 'completed',
      value: 125,
      chainId: 8453, // Base
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'swap':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
          </svg>
        )
      case 'deposit':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        )
      case 'withdraw':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
          </svg>
        )
      case 'claim':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
        )
    }
  }

  const getChainName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return 'Ethereum'
      case 137:
        return 'Polygon'
      case 42161:
        return 'Arbitrum'
      case 8453:
        return 'Base'
      default:
        return 'Unknown'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'pending':
        return 'bg-yellow-500'
      case 'failed':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Transactions</h2>
        <button className="text-sm text-primary font-medium hover:underline">
          View All
        </button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="h-16 rounded-lg skeleton" />
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <div className="text-4xl mb-3">📝</div>
          <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
          <p>Your recent transactions will appear here</p>
        </div>
      ) : (
        <div className="divide-y divide-border/40">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              className="py-4 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`p-2 rounded-full mr-4 text-white ${tx.type === 'swap' ? 'bg-blue-500' : tx.type === 'deposit' ? 'bg-green-500' : tx.type === 'withdraw' ? 'bg-orange-500' : 'bg-purple-500'}`}>
                {getTransactionIcon(tx.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{tx.description}</span>
                  <span className="font-medium">
                    ${tx.value.toLocaleString('en-US')}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <span>{getChainName(tx.chainId)}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(tx.timestamp, { addSuffix: true })}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getStatusColor(tx.status)}`}></span>
                    <span>{tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
                  </div>
                </div>
              </div>
              
              <button className="ml-4 text-primary hover:text-primary/80">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  )
}
