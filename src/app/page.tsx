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
      longDescription: [
        "Led the development of various features and projects focusing on improving our customer's repayment rate and overall loan repayment experience(Payments, Payments history, Benefits, Accounts, etc.). These features were developed based on A/B tests, experiments and measurements. The main metric we measured and cared to improve was the repayment rate (repayment speed or collection speed). Some of these experiments improved the repayment rate of different cohorts by 1-3%, resulting in a reduction of our loan loss rates and improving the annual recurring revenue",
        "Worked together with the UI/UX team on developing a new design system for our app and contributed heavily to the adoption of this latest design system in the customer app while also making sure that we didn't break the look and feel of the app in the transition period of this revamp.",
        "Led the development of various features and functionalities improving our customers' collateral device management & unlocking experience. These features reduced the incoming incidents to our customer care team by 20% yearly as most of the issues were related to devices not unlocking. This decrease saved the company a significant amount of Customer Care costs per year.",
        "Contributed to various platform work focusing on the stability and performance of our app. These contributions resulted in an increase in our crash-free sessions to 99.9% from 96.6%, a decrease in the app's total download size by 44% from 16mb to 9mb, a decrease in the initial cold startup time of the app for the 90th percentile of our customers from 6seconds to 3seconds, while hot startup decreased to 800ms from 1.5seconds.",
        "Involved and led various parts of a complete rewrite and redesign of our app from an outdated multiple activity C# & frontend development inspired MVVM style architecture to a more modern and standard clean architecture and MVI pattern acknowledged and adopted in the Android community introducing Jetpack Compose and concepts like Unidirectional data flow together with a layered architecture of presentation, domain and data"
      ],
      tags: [
        "Kotlin",
        "Clean architecture",
        "Compose UI Toolkit",
        "MVI",
        "Unidirectional data flow",
        "Kotlin Coroutines / Flows",
        "AndroidX / Jetpack Suite",
        "Material Design 3",
      ]
    },
    {
      company: 'HalcyonMobile',
      title: 'Android Technical Lead',
      period: '2015 - 2021',
      url: 'https://halcyonmobile.com/',
      description: 'HalcyonMobile is a digital product development agency specializing in designing and building custom mobile and web applications for startups and established businesses.',
      progression: ['Android Engineer', 'Senior Android Engineer', 'Android Technical Lead'],
      roles: [
        {
          title: 'Android Technical Lead',
          period: '2018 - 2021',
          description: [
            "Directed technical alignment and established architectural vision on partner projects while supervising 6 technical projects and mentoring 4 engineers into lead roles."
          ],
          products: [
            "Urbantz: Modernized an outdated cross-platform solution for over 20 large enterprise customers.",
            "Airstar: Designed and developed a BLE-enabled companion app, enabling simple control over 256 connected devices and reducing operation costs.",
            "MyMy: Led Android development, enabling $4.1M in funding across 2 rounds."
          ]
        },
        {
          title: 'Senior Android Engineer',
          period: '2017 - 2018',
          description: [
            "Championed Kotlin adoption, reducing codebase size by ~35%, improving developer productivity by ~20%, introducing various patterns, and reducing data state bugs by ~15% while mentoring junior/mid-engineers."
          ],
          products: [
            "rTribe & R2Q: Connected 300k+ individuals with coaches for addiction recovery and mental health support."
          ]
        },
        {
          title: 'Android Engineer',
          period: '2015 - 2017',
          description: [
            "Led a team of 3 developers, improving efficiency with RxJava (reducing concurrency bugs by ~20%) and DataBinding (reducing UI state bugs by ~25%)."
          ],
          products: [
            "Ryalto: Enabled partnerships with 50+ hospitals & NHS trusts.",
            "SmartUp: Built a scalable peer-to-peer learning platform, adopted by 10+ organizations."
          ]
        }
      ],
      tags: [
        "Kotlin",
        "Clean Architecture",
        "MVVM",
        "Android Architecture Components",
        "Dependency Injection",
        "RxJava",
        "CI/CD",
        "Technical Leadership"
      ]
    },
    {
      company: 'Reea',
      title: 'Android Software Developer',
      period: '2014 - 2015',
      url: 'https://www.reea.net/',
      description: 'Reea is a software development consultancy that designs and builds custom digital solutions, specializing in web and mobile applications for businesses across diverse industries.',
      progression: ['Android Intern', 'Android Software Developer'],
      roles: [
        {
          title: 'Android Software Developer',
          period: '2014 - 2015',
          description: [
            "Developed native Android applications, involved in the full project development cycle from requirements clarification to delivery.",
            "Maintained and fixed bugs on legacy projects, increasing crash-free sessions from 97.6% to 99.4%."
          ]
        },
        {
          title: 'Android Developer Intern',
          period: '2014',
          description: [
            "Developed a simple board game app (Mill/Nine Men's Morris), learning the basics of Android development and applying OOP principles and coding best practices."
          ]
        }
      ],
      tags: [
        "Java",
        "Android SDK",
        "OOP",
        "Git",
        "MVC"
      ]
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
    <main>
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
                a software engineer building{' '}
                <span className="text-[#CC9200] font-medium">mobile products</span>.
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
                <div>
                  <div className="flex flex-wrap items-center justify-between w-full gap-2 mb-2">
                    <h3 className="text-2xl font-medium">{experience.title}</h3>
                    <span className="text-on-surface/60 text-sm bg-secondary-container 
                      text-on-secondary-container px-3 py-1 rounded-full whitespace-nowrap">
                      {experience.period}
                    </span>
                  </div>
                  {experience.progression && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                      <span className="text-base text-on-surface/60">Career progression:</span>
                      <div className="flex flex-wrap items-center text-sm text-on-surface/60">
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
                  <a 
                    href={experience.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-lg hover:text-primary/80 transition-colors mt-2 block"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {experience.company}
                  </a>
                </div>
                
                <p className="text-on-surface/70 my-4">
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
