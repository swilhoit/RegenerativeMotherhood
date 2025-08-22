'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-8 py-6" aria-label="Main navigation">
      <div className="max-w-[1440px] mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-between items-center">
          <button 
            className="text-beige text-sm font-diatype-mono tracking-wider hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('#welcome')}
          >
            STORY
          </button>
          
          <button 
            className="text-beige text-sm font-diatype-mono tracking-wider hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('#five-principles')}
          >
            PRINCIPLES
          </button>
          
          <button 
            className="text-beige text-sm font-diatype-mono tracking-wider hover:opacity-80 transition-opacity"
            onClick={() => scrollToSection('#about')}
          >
            ABOUT
          </button>
          
          <Link 
            href="/work-with-me"
            className="text-beige text-sm font-diatype-mono tracking-wider hover:opacity-80 transition-opacity"
          >
            WORK WITH ME
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button 
                className="text-beige text-xs font-diatype-mono tracking-wider"
                onClick={() => scrollToSection('#welcome')}
              >
                STORY
              </button>
              <button 
                className="text-beige text-xs font-diatype-mono tracking-wider"
                onClick={() => scrollToSection('#five-principles')}
              >
                PRINCIPLES
              </button>
            </div>
            
            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Image 
                src="/website/logo.svg" 
                alt="Regenerative Motherhood" 
                width={180} 
                height={42}
                className="w-auto h-auto"
              />
            </div>
            
            <div className="flex space-x-4">
              <button 
                className="text-beige text-xs font-diatype-mono tracking-wider"
                onClick={() => scrollToSection('#about')}
              >
                ABOUT
              </button>
              <Link 
                href="/work-with-me"
                className="text-beige text-xs font-diatype-mono tracking-wider"
              >
                WORK WITH ME
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}