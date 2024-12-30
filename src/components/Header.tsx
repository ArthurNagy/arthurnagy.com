'use client'

import React from 'react'

export default function Header() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface-container/95 backdrop-blur-sm elevation-1 z-50">
      <nav className="max-w-4xl mx-auto flex justify-between items-center px-6 md:px-4 h-16">
        <button 
          onClick={() => scrollToSection('home')} 
          className="text-xl font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Arthur Nagy
        </button>
        <div className="flex items-center gap-4 md:gap-8 ml-4 md:ml-0">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-on-surface/70 hover:text-primary transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('experience')}
            className="text-on-surface/70 hover:text-primary transition-colors"
          >
            Experience
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-on-surface/70 hover:text-primary transition-colors"
          >
            Contact
          </button>
        </div>
      </nav>
    </header>
  )
} 