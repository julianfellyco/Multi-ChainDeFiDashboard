// components/Navbar.tsx

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ConnectButton } from './ConnectButton'
import { ChainSelector } from './ChainSelector'
import { ThemeToggle } from './ThemeToggle'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  return (
    <AnimatePresence>
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glassmorphism border-b border-border/40' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <motion.div
                className="text-xl font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Modern DeFi Dashboard
              </motion.div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <ChainSelector />
              <ThemeToggle />
              <ConnectButton />
            </div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}
