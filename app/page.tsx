import Hero from '@/components/Hero'
import Welcome from '@/components/Welcome'
import FivePrinciples from '@/components/FivePrinciples'
import About from '@/components/About'
import Footer from '@/components/Footer'
import SanityTest from '@/components/SanityTest'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Welcome />
      {/* Sanity CMS Connection Test - Remove this after verification */}
      <div className="py-8 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto">
          <SanityTest />
        </div>
      </div>
      <FivePrinciples />
      <About />
      <Footer />
    </main>
  )
}