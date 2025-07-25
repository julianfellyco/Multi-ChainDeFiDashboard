// components/PriceChart.tsx

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from './ui/Card'
import { LoadingSpinner } from './ui/LoadingSpinner'
import { commonTokens } from '@/lib/tokens'

interface PriceChartProps {
  selectedToken: string | null
}

export function PriceChart({ selectedToken }: PriceChartProps) {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '1Y'>('1W')
  const [isLoading, setIsLoading] = useState(false)
  const [chartData, setChartData] = useState<Array<{ time: string; price: number }>>([])
  
  const token = selectedToken 
    ? commonTokens.find(t => t.address === selectedToken) 
    : commonTokens[0]

  const timeRanges = ['1D', '1W', '1M', '1Y'] as const

  // Generate mock chart data
  useEffect(() => {
    if (!token) return
    
    setIsLoading(true)
    
    // Simulate API request
    setTimeout(() => {
      const now = new Date()
      const data = []
      const dataPoints = timeRange === '1D' ? 24 : timeRange === '1W' ? 7 : timeRange === '1M' ? 30 : 365
      const initialPrice = token.price
      const volatility = 0.03 // 3% volatility
      
      let currentPrice = initialPrice
      
      for (let i = dataPoints; i >= 0; i--) {
        const time = new Date(now)
        
        if (timeRange === '1D') {
          time.setHours(now.getHours() - i)
        } else if (timeRange === '1W') {
          time.setDate(now.getDate() - i)
        } else if (timeRange === '1M') {
          time.setDate(now.getDate() - i)
        } else {
          time.setDate(now.getDate() - i)
        }
        
        // Random walk
        const randomChange = (Math.random() - 0.5) * 2 * volatility
        currentPrice = currentPrice * (1 + randomChange)
        
        data.push({
          time: time.toISOString(),
          price: currentPrice,
        })
      }
      
      setChartData(data)
      setIsLoading(false)
    }, 800)
  }, [token, timeRange])

  // Calculate price change
  const priceChange = chartData.length > 1 
    ? ((chartData[chartData.length - 1].price - chartData[0].price) / chartData[0].price) * 100
    : 0

  // Find min and max for chart scaling
  const prices = chartData.map(d => d.price)
  const minPrice = Math.min(...prices) * 0.99
  const maxPrice = Math.max(...prices) * 1.01
  const priceRange = maxPrice - minPrice

  return (
    <Card className="p-6 h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            {token && (
              <img 
                src={token.logoURI} 
                alt={token.name} 
                className="w-8 h-8 mr-3"
              />
            )}
            {token ? token.name : 'Select a token'}
            <span className="ml-2 text-lg text-muted-foreground">
              {token && token.symbol}
            </span>
          </h2>
          
          {token && (
            <div className="flex items-baseline mt-2">
              <span className="text-xl font-medium">
                ${token.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 6,
                })}
              </span>
              
              <span className={`ml-2 text-sm font-medium ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
              </span>
            </div>
          )}
        </div>
        
        <div className="flex space-x-1 bg-secondary/30 p-1 rounded-lg">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`relative py-1 px-3 text-sm font-medium rounded-md transition-all duration-200 ${
                timeRange === range ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setTimeRange(range)}
            >
              {timeRange === range && (
                <motion.div
                  className="absolute inset-0 bg-primary rounded-md"
                  layoutId="activeTimeRange"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{range}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : !token ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Select a token to view price chart
          </div>
        ) : (
          <div className="h-full">
            <svg width="100%" height="100%" viewBox={`0 0 ${chartData.length} 100`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop
                    offset="0%"
                    stopColor={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
                    stopOpacity="0.2"
                  />
                  <stop
                    offset="100%"
                    stopColor={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              
              {/* Chart line */}
              <motion.path
                d={chartData.map((d, i) => {
                  const x = i
                  const y = 100 - ((d.price - minPrice) / priceRange) * 100
                  return i === 0 ? `M ${x},${y}` : `L ${x},${y}`
                }).join(' ')}
                fill="none"
                stroke={priceChange >= 0 ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              
              {/* Area fill under the line */}
              <motion.path
                d={`
                  ${chartData.map((d, i) => {
                    const x = i
                    const y = 100 - ((d.price - minPrice) / priceRange) * 100
                    return i === 0 ? `M ${x},${y}` : `L ${x},${y}`
                  }).join(' ')}
                  L ${chartData.length - 1},100
                  L 0,100 Z
                `}
                fill="url(#chartGradient)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
            </svg>
            
            <div className="mt-4 flex justify-between text-xs text-muted-foreground">
              {timeRange === '1D' ? (
                <>
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </>
              ) : timeRange === '1W' ? (
                <>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </>
              ) : timeRange === '1M' ? (
                <>
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </>
              ) : (
                <>
                  <span>Jan</span>
                  <span>Mar</span>
                  <span>May</span>
                  <span>Jul</span>
                  <span>Sep</span>
                  <span>Nov</span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
