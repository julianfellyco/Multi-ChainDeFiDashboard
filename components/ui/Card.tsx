import { forwardRef, HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const Card = forwardRef<
  HTMLDivElement,
  HTMLAttributes & { hoverEffect?: boolean }
>(({ className, hoverEffect = true, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'glassmorphism p-6',
        hoverEffect && 'transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1',
        className
      )}
      whileHover={hoverEffect ? { scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      {...props}
    />
  )
})

Card.displayName = 'Card'

export { Card }
