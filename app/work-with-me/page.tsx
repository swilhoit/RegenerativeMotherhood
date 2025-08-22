import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function WorkWithMe() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-cream">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] px-8 pt-24">
          <div className="max-w-[800px] text-center">
            <h1 className="text-5xl lg:text-7xl font-concrette font-light text-darkBrown mb-6">
              Work With Me
            </h1>
            <p className="text-lg font-dm-sans text-brown">
              Find the right support for your family&apos;s sleep journey
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-beige px-8 py-20">
        <div className="max-w-[1200px] mx-auto space-y-16">
          {/* Sleep Guidance Call */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/Frame 1627810.jpg"
                alt="Sleep Guidance Call"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-concrette font-light text-darkBrown">
                Sleep Guidance Call
              </h2>
              <p className="font-dm-sans text-brown">
                A 90-minute deep dive into your baby&apos;s sleep. We&apos;ll explore your unique situation, 
                identify the root causes of sleep challenges, and create a personalized action plan that 
                aligns with your parenting values.
              </p>
              <ul className="space-y-2 font-dm-sans text-brown">
                <li>• Comprehensive sleep assessment</li>
                <li>• Customized sleep plan</li>
                <li>• Follow-up support via email</li>
                <li>• Recording of our session</li>
              </ul>
              <Link 
                href="/sleep-guidance-call"
                className="inline-block bg-darkBrown text-beige px-8 py-3 rounded-full font-diatype-mono text-sm hover:bg-brown transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Comprehensive Sleep Support */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-3xl lg:text-4xl font-concrette font-light text-darkBrown">
                Comprehensive Sleep Support
              </h2>
              <p className="font-dm-sans text-brown">
                Three weeks of intensive support to transform your family&apos;s sleep. This package includes 
                everything you need to create lasting, gentle changes that work for your unique situation.
              </p>
              <ul className="space-y-2 font-dm-sans text-brown">
                <li>• Initial 2-hour consultation</li>
                <li>• Detailed sleep plan</li>
                <li>• Daily check-ins for 3 weeks</li>
                <li>• Two follow-up calls</li>
                <li>• Unlimited email support</li>
              </ul>
              <Link 
                href="/comprehensive-sleep-support"
                className="inline-block bg-darkBrown text-beige px-8 py-3 rounded-full font-diatype-mono text-sm hover:bg-brown transition-colors"
              >
                Learn More
              </Link>
            </div>
            <div className="relative h-[400px] order-1 lg:order-2">
              <Image
                src="/Frame 162784.jpg"
                alt="Comprehensive Sleep Support"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}