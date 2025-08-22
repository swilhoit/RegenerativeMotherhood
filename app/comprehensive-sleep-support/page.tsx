import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function ComprehensiveSleepSupport() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] bg-cream">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh] px-8 pt-24">
          <div className="max-w-[800px] text-center">
            <h1 className="text-5xl lg:text-7xl font-concrette font-light text-darkBrown mb-6">
              Comprehensive Sleep Support
            </h1>
            <p className="text-lg font-dm-sans text-brown">
              Three weeks of transformation for your family&apos;s sleep
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-beige px-8 py-20">
        <div className="max-w-[800px] mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              Transform Your Family&apos;s Sleep
            </h2>
            <div className="space-y-4 font-dm-sans text-brown">
              <p>
                Sometimes you need more than a single consultation. When sleep challenges feel overwhelming 
                or you want intensive support through a transition, the Comprehensive Sleep Support package 
                provides the guidance and accountability you need.
              </p>
              <p>
                Over three weeks, we&apos;ll work together to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Identify and address the root causes of sleep challenges</li>
                <li>Create a sustainable sleep rhythm for your family</li>
                <li>Navigate sleep regressions and developmental leaps</li>
                <li>Build your confidence in responding to your baby&apos;s needs</li>
                <li>Establish healthy sleep foundations without sleep training</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              Your Journey
            </h2>
            <div className="space-y-6">
              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">Week 1: Discovery & Planning</h3>
                <p className="text-sm font-dm-sans text-brown mb-3">
                  We begin with a comprehensive 2-hour consultation to understand your family&apos;s unique situation. 
                  You&apos;ll receive your personalized sleep plan within 48 hours.
                </p>
                <ul className="text-sm font-dm-sans text-brown space-y-1">
                  <li>• Initial consultation</li>
                  <li>• Sleep assessment</li>
                  <li>• Customized action plan</li>
                  <li>• Daily check-ins begin</li>
                </ul>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">Week 2: Implementation & Adjustment</h3>
                <p className="text-sm font-dm-sans text-brown mb-3">
                  As you implement changes, I&apos;m here every step of the way. We&apos;ll fine-tune your approach 
                  based on your baby&apos;s responses.
                </p>
                <ul className="text-sm font-dm-sans text-brown space-y-1">
                  <li>• Mid-point check-in call</li>
                  <li>• Plan adjustments as needed</li>
                  <li>• Troubleshooting challenges</li>
                  <li>• Continued daily support</li>
                </ul>
              </div>

              <div className="bg-cream p-6 rounded-lg">
                <h3 className="font-diatype-mono text-darkBrown mb-3">Week 3: Integration & Confidence</h3>
                <p className="text-sm font-dm-sans text-brown mb-3">
                  By week three, you&apos;ll feel confident in your approach. We&apos;ll ensure you have everything 
                  you need for continued success.
                </p>
                <ul className="text-sm font-dm-sans text-brown space-y-1">
                  <li>• Final consultation call</li>
                  <li>• Long-term strategies</li>
                  <li>• Addressing remaining concerns</li>
                  <li>• Graduation planning</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              What&apos;s Included
            </h2>
            <div className="grid md:grid-cols-2 gap-4 font-dm-sans text-brown">
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">2-hour initial consultation</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Personalized sleep plan</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Daily check-ins for 21 days</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Two 45-minute follow-up calls</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Unlimited email support</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Sleep log review & feedback</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Resource library access</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-darkBrown">✓</span>
                <span className="text-sm">Recording of all calls</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-concrette font-light text-darkBrown">
              Investment
            </h2>
            <p className="font-dm-sans text-brown">
              Your investment in Comprehensive Sleep Support is $997. Payment plans are available to make 
              this transformation accessible for your family.
            </p>
            <button className="bg-darkBrown text-beige px-8 py-3 rounded-full font-diatype-mono text-sm hover:bg-brown transition-colors">
              Apply Now
            </button>
          </div>

          <div className="bg-cream p-8 rounded-lg space-y-4">
            <p className="font-dm-sans text-brown italic">
              &quot;I was skeptical that anything could help without leaving my baby to cry. But this approach 
              honored our attachment while still creating the changes we desperately needed. The daily support 
              made all the difference - I never felt alone in the process.&quot;
            </p>
            <p className="font-diatype-mono text-darkBrown text-sm">
              - Maria, mom of 5-month-old twins
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}