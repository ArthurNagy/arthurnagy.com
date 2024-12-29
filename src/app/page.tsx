'use client'

import { useState, FormEvent, useCallback } from 'react'
import Section from '@/components/Section'
import Image from 'next/image'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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
                  className="object-cover transition-transform duration-300
                    group-hover:scale-110
                    group-hover:rotate-3"
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
            <div className="bg-surface-container rounded-3xl p-8 elevation-1 hover:elevation-2 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-medium">Senior Android Developer</h3>
                <span className="text-on-surface/60 text-sm bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full">
                  2020 - Present
                </span>
              </div>
              <p className="text-primary mb-6 text-lg">Company</p>
              <ul className="text-on-surface/70 mb-6 space-y-2">
                <li>• Led key Android initiatives and architectural decisions</li>
                <li>• Mentored team members and established development standards</li>
                <li>• Improved app performance and user experience</li>
              </ul>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-sm">
                  Kotlin
                </span>
                <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-sm">
                  Android
                </span>
                <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-sm">
                  Jetpack Compose
                </span>
              </div>
            </div>

            {/* Second experience card with same styling */}
          </div>
        </div>
      </Section>

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
                  className="w-full px-4 py-3 rounded-full bg-surface-container border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  required
                />
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
                className={`w-full px-6 py-3 bg-primary text-on-primary rounded-full elevation-1 hover:elevation-2 transition-all ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
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
