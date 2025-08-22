import Hero from '@/components/Hero'
import Welcome from '@/components/Welcome'
import FivePrinciples from '@/components/FivePrinciples'
import About from '@/components/About'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Welcome />
      <FivePrinciples />
      <About />
      <Footer />
    </main>
  )
}