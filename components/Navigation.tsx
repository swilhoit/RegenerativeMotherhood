'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav 
        className={`absolute top-[32px] left-[63px] right-[63px] z-50 h-[60px] transition-all duration-300
                    ${isSticky ? 'fixed top-0 left-0 right-0 bg-cream/95 backdrop-blur-[10px] px-[63px] py-[15px] shadow-[0_2px_10px_rgba(0,0,0,0.1)]' : ''}`}
        aria-label="Main navigation"
      >
        <div className="relative w-full max-w-[1386px] h-[60px] mx-auto">
          {/* Desktop Navigation - Exact Figma positioning */}
          <div className="hidden lg:block">
            <button 
              className="absolute left-[80px] top-[9px] w-[51px] h-[42px] text-beige font-diatype-mono text-[14px] font-normal tracking-[0.28px] uppercase opacity-0 animate-[fadeIn_0.6s_linear_0.5s_forwards] hover:opacity-80"
              onClick={() => scrollToSection('#welcome')}
            >
              STORY
            </button>
            
            <button 
              className="absolute left-[290px] top-[9px] w-[107px] h-[42px] text-beige font-diatype-mono text-[14px] font-normal tracking-[0.28px] uppercase opacity-0 animate-[fadeIn_0.6s_linear_0.2s_forwards] hover:opacity-80"
              onClick={() => scrollToSection('#five-principles')}
            >
              PRINCIPLES
            </button>
            
            <button 
              className="absolute left-[1008px] top-[9px] w-[69px] h-[42px] text-beige font-diatype-mono text-[14px] font-normal tracking-[0.28px] uppercase opacity-0 animate-[fadeIn_0.6s_linear_0.2s_forwards] hover:opacity-80"
              onClick={() => scrollToSection('#about')}
            >
              ABOUT
            </button>
            
            <Link 
              href="/work-with-me"
              className="absolute left-[1211px] top-[9px] w-[121px] h-[42px] text-beige font-diatype-mono text-[14px] font-normal tracking-[0.28px] uppercase opacity-0 animate-[fadeIn_0.6s_linear_0.5s_forwards] hover:opacity-80"
            >
              WORK WITH ME
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex justify-between items-center h-full">
            <Image 
              src="/website/mobile-logo.svg" 
              alt="Regenerative Motherhood" 
              width={102} 
              height={38}
              className="h-[38px] w-auto brightness-0 invert"
            />
            
            <button 
              className="w-[56px] h-[48px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Image
                src="/website/mobile-menu.svg"
                alt="Menu"
                width={24}
                height={20}
                className="brightness-0 invert"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[1000] bg-black/85 backdrop-blur-[6px] transition-all duration-300 lg:hidden
                      ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
           style={{ backgroundImage: 'url(/website/gradient.jpg)' }}>
        <div className={`flex flex-col justify-center items-center h-full gap-10 transform transition-transform duration-[350ms]
                        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button 
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="text-beige text-2xl">×</span>
          </button>

          <button 
            className="min-w-[200px] px-6 py-4 rounded-xl text-beige font-diatype-mono text-[18px] uppercase tracking-[0.36px] hover:bg-beige/10 hover:border hover:border-beige/20 transition-all"
            onClick={() => { scrollToSection('#welcome'); setMobileMenuOpen(false); }}
          >
            STORY
          </button>
          
          <button 
            className="min-w-[200px] px-6 py-4 rounded-xl text-beige font-diatype-mono text-[18px] uppercase tracking-[0.36px] hover:bg-beige/10 hover:border hover:border-beige/20 transition-all"
            onClick={() => { scrollToSection('#five-principles'); setMobileMenuOpen(false); }}
          >
            PRINCIPLES
          </button>
          
          <button 
            className="min-w-[200px] px-6 py-4 rounded-xl text-beige font-diatype-mono text-[18px] uppercase tracking-[0.36px] hover:bg-beige/10 hover:border hover:border-beige/20 transition-all"
            onClick={() => { scrollToSection('#about'); setMobileMenuOpen(false); }}
          >
            ABOUT
          </button>
          
          <Link 
            href="/work-with-me"
            className="min-w-[200px] px-6 py-4 rounded-xl text-beige font-diatype-mono text-[18px] uppercase tracking-[0.36px] hover:bg-beige/10 hover:border hover:border-beige/20 transition-all"
            onClick={() => setMobileMenuOpen(false)}
          >
            WORK WITH ME
          </Link>
        </div>
      </div>
    </>
  )
}