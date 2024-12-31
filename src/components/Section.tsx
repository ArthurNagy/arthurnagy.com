'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionProps {
  id: string
  className?: string
  children: React.ReactNode
}

export default function Section({ id, className, children }: SectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      id={id} 
      className={`${id === 'home' ? 'pt-16' : ''} ${className}`}
    >
      {children}
    </motion.section>
  )
} 