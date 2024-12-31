'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Experience } from '@/types/experience'

interface ExperienceDialogProps {
  isOpen: boolean
  onClose: () => void
  experience: Experience | null
}

export default function ExperienceDialog({ isOpen, onClose, experience }: ExperienceDialogProps) {
  if (!experience) return null

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          
          {/* Dialog Container - helps with centering */}
          <div className="fixed inset-0 overflow-y-auto z-50" onClick={onClose}>
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Dialog */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-2xl bg-surface rounded-3xl p-8 elevation-2 
                  relative overflow-hidden"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dialog
              >
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 p-2 rounded-full 
                    hover:bg-surface-container transition-colors"
                >
                  <X className="w-6 h-6 text-on-surface/60" />
                </button>

                <div className="mb-6">
                  <h3 className="text-2xl font-medium mb-2">{experience.title}</h3>
                  <a 
                    href={experience.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {experience.company}
                  </a>
                  <span className="text-on-surface/60 text-sm block mt-2">
                    {experience.period}
                  </span>
                </div>

                {/* Content will go here */}
                <div className="space-y-6">
                  {/* We'll add the detailed content later */}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 