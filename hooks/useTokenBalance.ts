// hooks/useTokenBalance.ts

import { useState, useEffect } from 'react'
import { useChainId } from 'wagmi'
import { commonTokens } from '@/lib/tokens'

export function useTokenBalance(address: string | undefined) {
  const chainId = useChainId()
  const [balances, setBalances] = useState<Record<string, number>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!address) {
      setBalances({})
      setIsLoading(false)
      return
    }

    const fetchBalances = async () => {
      setIsLoading(true)
      setError(null)

      try {
        // In a real application, this would make RPC calls to fetch token balances
        // For this demo, we'll use mock data
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Generate mock balances
        const mockBalances: Record<string, number> = {}
        
        commonTokens.forEach(token => {
          // Generate random balance based on token price to make it realistic
          // More expensive tokens tend to have smaller balances
          const randomMultiplier = Math.random() * 10 + 0.1 // Between 0.1 and 10.1
          const inversePrice = 100 / (token.price || 1)
          const balance = (randomMultiplier * inversePrice) / 100
          
          mockBalances[token.address] = balance
        })
        
        setBalances(mockBalances)
      } catch (err) {
        console.error('Error fetching token balances:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch token balances'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalances()
  }, [address, chainId])

  return { balances, isLoading, error }
}
