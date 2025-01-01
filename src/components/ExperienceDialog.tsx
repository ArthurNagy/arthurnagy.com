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
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end mb-2">
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-surface-container transition-colors"
                  >
                    <X className="w-6 h-6 text-on-surface/60" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap items-center justify-between mb-2">
                    <h3 className="text-2xl font-medium">{experience.title}</h3>
                    <span className="text-on-surface/60 text-sm bg-secondary-container 
                      text-on-secondary-container px-3 py-1 rounded-full whitespace-nowrap ml-2">
                      {experience.period}
                    </span>
                  </div>
                  <a 
                    href={experience.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:text-primary/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {experience.company}
                  </a>
                </div>

                <div className="space-y-8">
                  {experience.roles ? (
                    experience.roles.map((role, index) => (
                      <div key={role.title} className="space-y-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-lg font-medium">{role.title}</h4>
                          <span className="text-on-surface/60 text-sm bg-secondary-container 
                            text-on-secondary-container px-3 py-1 rounded-full">
                            {role.period}
                          </span>
                        </div>
                        
                        <ul className="list-disc space-y-4 pl-4 text-on-surface/70">
                          {role.description.map((item, i) => (
                            <li key={i} className="leading-relaxed text-base pl-2">
                              {item}
                            </li>
                          ))}
                        </ul>

                        {role.products && (
                          <div className="mt-6">
                            <h5 className="font-medium text-on-surface mb-4">Products I've worked on:</h5>
                            <ul className="space-y-4 text-on-surface/70">
                              {role.products.map((product, i) => (
                                <li key={i} className="leading-relaxed text-base">
                                  • {product}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <ul className="list-disc space-y-4 pl-4 text-on-surface/70">
                      {experience.longDescription?.map((paragraph, index) => (
                        <li key={index} className="leading-relaxed text-base pl-2">
                          {paragraph}
                        </li>
                      ))}
                    </ul>
                  )}

                  {experience.tags && (
                    <div className="pt-6 border-t border-outline-variant">
                      <div className="flex flex-wrap gap-2">
                        {experience.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-primary-container text-on-primary-container 
                              rounded-full text-sm font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 