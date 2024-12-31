'use client'

import { useState, FormEvent, useCallback } from 'react'
import Section from '@/components/Section'
import Image from 'next/image'
import ExperienceDialog from '@/components/ExperienceDialog'
import { Experience } from '@/types/experience'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)

  const experiences: Experience[] = [
    {
      company: 'M-KOPA',
      title: 'Senior Android Engineer',
      period: '2021 - Present',
      url: 'https://www.m-kopa.com/',
      description: 'M-KOPA is a fintech platform that provides smartphone financing and digital financial services to underserved consumers across Africa, enabling access to digital connectivity and financial inclusion.',
    },
    {
      company: 'HalcyonMobile',
      title: 'Android Technical Lead',
      period: '2015 - 2021',
      url: 'https://halcyonmobile.com/',
      description: 'HalcyonMobile is a digital product development agency specializing in designing and building custom mobile and web applications for startups and established businesses.',
      progression: ['Android Engineer', 'Senior Android Engineer', 'Android Technical Lead']
    },
    {
      company: 'Reea',
      title: 'Android Software Developer',
      period: '2014 - 2015',
      url: 'https://www.reea.net/',
      description: 'Reea is a software development consultancy that designs and builds custom digital solutions, specializing in web and mobile applications for businesses across diverse industries.',
      progression: ['Android Intern', 'Android Software Developer']
    }
  ]

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    setStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Too many attempts. Please try again in a minute.')
        }
        throw new Error(data.error || 'Failed to send message')
      }
      
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error:', error)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }, [formData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience)
  }

  return (
    <main className="pt-16">
      <Section id="home" className="min-h-[90vh] flex items-center py-16 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-shrink-0 group cursor-pointer perspective-1000">
              <div className="relative w-48 h-48 rounded-full overflow-hidden elevation-2 
                transition-all duration-300 ease-out
                group-hover:elevation-3 group-hover:scale-105
                transform-gpu group-hover:rotate-y-12
                before:absolute before:inset-0 before:z-10 
                before:bg-[radial-gradient(circle_at_50%_50%,rgba(103,80,164,0.1),transparent_70%)]
                before:opacity-0 group-hover:before:opacity-100 
                before:transition-all before:duration-300
                after:absolute after:inset-0 after:z-20
                after:ring-1 after:ring-primary/5
                after:rounded-full after:transition-all
                group-hover:after:ring-primary/20
                group-active:scale-95"
              >
                <Image
                  src="/images/profile.webp"
                  alt="Arthur Nagy"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 384px"
                  className="object-cover transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-full bg-primary/5 mix-blend-overlay 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-6xl font-medium mb-8">
                Hi, I&apos;m <span className="text-primary">Arthur Nagy</span>
              </h1>
              
              <p className="text-on-surface/70 text-xl mb-8">
                a software engineer building mobile products.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-primary text-on-primary rounded-full elevation-1 hover:elevation-2 transition-all"
                >
                  About Me
                </button>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 text-primary border border-outline-variant rounded-full hover:bg-primary-container hover:text-on-primary-container transition-all"
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section id="about" className="py-24 px-4 bg-surface-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-medium mb-6">About Me</h2>
          <p className="text-on-surface/70 text-lg leading-relaxed">
          I am a software engineer specializing in building mobile products. With over a decade of experience in Android development, I excel at designing scalable, reliable applications and crafting elegant solutions to complex problems. I bring a product-minded approach to my work, aligning technical decisions with business goals, and have a proven ability to set the technical direction for projects while fostering clear communication and alignment across teams.
          </p>
        </div>
      </Section>

      <Section id="experience" className="py-24 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-medium mb-6">Experience</h2>
          <div className="grid grid-cols-1 gap-6">
            {experiences.map((experience) => (
              <button 
                key={experience.company}
                onClick={() => handleExperienceClick(experience)}
                className="group text-left bg-surface-container rounded-3xl p-8 elevation-1 
                  hover:elevation-2 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">
                      <span className="block">{experience.title}</span>
                      {experience.progression && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-base text-on-surface/60">Career progression:</span>
                          <div className="flex items-center text-sm text-on-surface/60">
                            {experience.progression.map((role, index) => (
                              <span key={role} className="flex items-center">
                                {role}
                                {index < experience.progression!.length - 1 && (
                                  <svg 
                                    className="w-4 h-4 mx-1" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                  >
                                    <path 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" 
                                      strokeWidth={2} 
                                      d="M9 5l7 7-7 7" 
                                    />
                                  </svg>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </h3>
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
                  <span className="text-on-surface/60 text-sm bg-secondary-container 
                    text-on-secondary-container px-3 py-1 rounded-full whitespace-nowrap">
                    {experience.period}
                  </span>
                </div>
                
                <p className="text-on-surface/70 mb-4">
                  {experience.description}
                </p>

                <div className="flex items-center gap-2 text-primary">
                  <span className="text-sm">View details</span>
                  <svg 
                    className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </Section>

      <ExperienceDialog
        isOpen={selectedExperience !== null}
        onClose={() => setSelectedExperience(null)}
        experience={selectedExperience}
      />

      <Section id="contact" className="py-24 px-4 bg-surface-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-medium mb-8">Contact Me</h2>
          <div className="bg-surface rounded-3xl p-8 elevation-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-on-surface/80 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-full bg-surface-container border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-on-surface/80 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-full bg-surface-container 
                    ${formErrors.email ? 'border-red-500' : 'border-outline-variant'}`}
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-on-surface/80 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-surface-container border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 bg-primary text-on-primary rounded-full elevation-1 
                  hover:elevation-2 transition-all relative
                  ${isSubmitting ? 'cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="text-center text-green-600 dark:text-green-400">
                  Message sent successfully!
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-red-600 dark:text-red-400">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </Section>
    </main>
  )
}
